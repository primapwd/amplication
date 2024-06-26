import {
  CircularProgress,
  Dialog,
  EnumContentAlign,
  EnumFlexDirection,
  EnumFlexItemMargin,
  EnumItemsAlign,
  EnumTextColor,
  EnumTextStyle,
  FlexItem,
  HorizontalRule,
  List,
  SearchField,
  Snackbar,
  Text,
  Toggle,
} from "@amplication/ui/design-system";
import { gql, useQuery } from "@apollo/client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, match, useLocation } from "react-router-dom";
import PageContent, { EnumPageWidth } from "../Layout/PageContent";
import * as models from "../models";
import { useTracking } from "../util/analytics";
import { AnalyticsEventNames } from "../util/analytics-events.types";
import { formatError } from "../util/error";
import { EntityListItem } from "./EntityListItem";
import NewEntity from "./NewEntity";

import { Button, EnumButtonStyle } from "../Components/Button";
import usePlugins from "../Plugins/hooks/usePlugins";
import { GET_CURRENT_WORKSPACE } from "../Workspaces/queries/workspaceQueries";
import { AppContext } from "../context/appContext";
import { AppRouteProps } from "../routes/routesUtil";
import { BillingFeature } from "@amplication/util-billing-types";
import { pluralize } from "../util/pluralize";
import EntitiesERD from "./EntityERD/EntitiesERD";
import "./EntityList.scss";
import {
  EntitlementType,
  FeatureIndicatorContainer,
} from "../Components/FeatureIndicatorContainer";
import {
  LicenseIndicatorContainer,
  LicensedResourceType,
} from "../Components/LicenseIndicatorContainer";
import {
  BtmButton,
  EnumButtonLocation,
} from "../Resource/break-the-monolith/BtmButton";

type TData = {
  entities: models.Entity[];
};

type GetWorkspaceResponse = {
  currentWorkspace: models.Workspace;
};

type Props = AppRouteProps & {
  match: match<{
    workspace: string;
    project: string;
    resource: string;
  }>;
};

type DisplayModeType = "list" | "erd";

const NAME_FIELD = "displayName";
const CLASS_NAME = "entity-list";

const POLL_INTERVAL = 30000;

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

const EntityList: React.FC<Props> = ({ match, innerRoutes }) => {
  const { resource } = match.params;
  const { trackEvent } = useTracking();
  const [error, setError] = useState<Error>();
  const pageTitle = "Entities";
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [newEntity, setNewEntity] = useState<boolean>(false);
  const { pluginInstallations } = usePlugins(resource);

  const { currentWorkspace, currentProject, currentResource } =
    useContext(AppContext);

  const query = useUrlQuery();
  const view = query.get("view");

  const displayModeValue: DisplayModeType = view === "erd" ? "erd" : "list";

  const [displayMode, setDisplayMode] =
    useState<DisplayModeType>(displayModeValue);

  const setDisplayModeValue = useCallback(
    (mode: DisplayModeType) => {
      setDisplayMode(mode);
      query.set("view", mode);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${query.toString()}`
      );
    },
    [query]
  );

  const isUserEntityMandatory =
    pluginInstallations?.filter(
      (x) =>
        x?.configurations?.requireAuthenticationEntity === "true" && x.enabled
    )?.length > 0;

  const handleNewEntityClick = useCallback(() => {
    setNewEntity(!newEntity);
  }, [newEntity, setNewEntity]);

  const {
    data,
    loading,
    error: errorLoading,
    refetch,
    stopPolling,
    startPolling,
  } = useQuery<TData>(GET_ENTITIES, {
    variables: {
      id: resource,
      orderBy: {
        [NAME_FIELD]: models.SortOrder.Asc,
      },
      whereName:
        searchPhrase !== ""
          ? { contains: searchPhrase, mode: models.QueryMode.Insensitive }
          : undefined,
    },
  });

  const handleSearchChange = useCallback(
    (value) => {
      setSearchPhrase(value);
    },
    [setSearchPhrase]
  );

  //start polling with cleanup
  useEffect(() => {
    refetch().catch(console.error);
    startPolling(POLL_INTERVAL);
    return () => {
      stopPolling();
    };
  }, [refetch, stopPolling, startPolling]);

  const handleEntityClick = () => {
    trackEvent({
      eventName: AnalyticsEventNames.UpgradeClick,
      eventOriginLocation: "entity-list",
    });
  };

  const { data: getWorkspaceData } = useQuery<GetWorkspaceResponse>(
    GET_CURRENT_WORKSPACE
  );

  const errorMessage =
    formatError(errorLoading) || (error && formatError(error));

  return match.isExact ? (
    <PageContent
      className={CLASS_NAME}
      pageTitle={pageTitle}
      pageWidth={
        displayMode === "list" ? EnumPageWidth.Default : EnumPageWidth.Full
      }
    >
      <>
        <Dialog
          isOpen={newEntity}
          onDismiss={handleNewEntityClick}
          title="New Entity"
        >
          <NewEntity resourceId={resource} onSuccess={handleNewEntityClick} />
        </Dialog>

        <FlexItem
          contentAlign={EnumContentAlign.Center}
          itemsAlign={EnumItemsAlign.Center}
        >
          <FlexItem.FlexStart>
            <SearchField
              label="search"
              placeholder="search"
              onChange={handleSearchChange}
            />
          </FlexItem.FlexStart>

          <FlexItem
            direction={EnumFlexDirection.Row}
            contentAlign={EnumContentAlign.Center}
            itemsAlign={EnumItemsAlign.Center}
          >
            <Text
              textStyle={EnumTextStyle.Tag}
              textColor={
                displayMode === "list"
                  ? EnumTextColor.White
                  : EnumTextColor.Black20
              }
            >
              List
            </Text>
            <div className={`${CLASS_NAME}__view-toggle`}>
              <Toggle
                value={displayMode === "erd"}
                defaultChecked={displayMode === "erd"}
                onValueChange={(isGraph) =>
                  setDisplayModeValue(isGraph ? "erd" : "list")
                }
              />
            </div>
            <Text
              textStyle={EnumTextStyle.Tag}
              textColor={
                displayMode === "erd"
                  ? EnumTextColor.White
                  : EnumTextColor.Black20
              }
            >
              ERD
            </Text>
          </FlexItem>
          <FlexItem.FlexEnd>
            <FlexItem direction={EnumFlexDirection.Row}>
              <BtmButton
                openInFullScreen={true}
                location={EnumButtonLocation.EntityList}
              />
              <Link
                to={`/${currentWorkspace?.id}/${currentProject?.id}/${currentResource?.id}/entities/import-schema`}
              >
                <FeatureIndicatorContainer
                  featureId={BillingFeature.ImportDBSchema}
                  entitlementType={EntitlementType.Boolean}
                  limitationText="Available in Enterprise plans only. "
                  reversePosition={true}
                >
                  <Button
                    className={`${CLASS_NAME}__install`}
                    buttonStyle={EnumButtonStyle.Outline}
                    eventData={{
                      eventName: AnalyticsEventNames.ImportPrismaSchemaClick,
                    }}
                  >
                    Upload Schema
                  </Button>
                </FeatureIndicatorContainer>
              </Link>
              <LicenseIndicatorContainer
                licensedResourceType={LicensedResourceType.Service}
              >
                <Button
                  className={`${CLASS_NAME}__add-button`}
                  buttonStyle={EnumButtonStyle.Primary}
                  onClick={handleNewEntityClick}
                >
                  Add entity
                </Button>
              </LicenseIndicatorContainer>
            </FlexItem>
          </FlexItem.FlexEnd>
        </FlexItem>

        <HorizontalRule doubleSpacing />

        {loading && <CircularProgress centerToParent />}

        <>
          {displayMode === "list" ? (
            <>
              <FlexItem margin={EnumFlexItemMargin.Bottom}>
                <Text textStyle={EnumTextStyle.Tag}>
                  {data?.entities.length}{" "}
                  {pluralize(data?.entities.length, "Entity", "Entities")}
                </Text>
              </FlexItem>

              <List>
                {data?.entities.map((entity) => (
                  <EntityListItem
                    key={entity.id}
                    entity={entity}
                    resourceId={resource}
                    onError={setError}
                    isUserEntityMandatory={isUserEntityMandatory}
                    relatedEntities={data.entities.filter(
                      (dataEntity) =>
                        dataEntity.fields.some(
                          (field) =>
                            field.properties.relatedEntityId === entity.id
                        ) && dataEntity.id !== entity.id
                    )}
                  />
                ))}
              </List>
            </>
          ) : (
            <EntitiesERD resourceId={resource} />
          )}
        </>

        <Snackbar
          open={Boolean(error || errorLoading)}
          message={errorMessage}
        />
      </>
    </PageContent>
  ) : (
    innerRoutes
  );
  /**@todo: move error message to hosting page  */
};

export default EntityList;

/**@todo: expand search on other field  */
/**@todo: find a solution for case insensitive search  */
export const GET_ENTITIES = gql`
  query getEntities(
    $id: String!
    $orderBy: EntityOrderByInput
    $whereName: StringFilter
  ) {
    entities(
      where: { resource: { id: $id }, displayName: $whereName }
      orderBy: $orderBy
    ) {
      id
      name
      displayName
      description
      lockedByUserId
      lockedAt
      lockedByUser {
        account {
          firstName
          lastName
        }
      }
      fields(where: { dataType: { equals: Lookup } }) {
        permanentId
        displayName
        properties
      }
      versions(take: 1, orderBy: { versionNumber: Desc }) {
        versionNumber
        commit {
          userId
          message
          createdAt
          user {
            id
            account {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;
