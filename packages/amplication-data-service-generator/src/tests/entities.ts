import {
  Entity,
  EnumDataType,
  EnumEntityPermissionType,
  EnumEntityAction,
} from "../types";

const CUSTOMER_ENTITY_ID = "b8d49afb-8c12-49fa-9d6e-eb64be0ddded";
const CUSTOMER_ORDERS_FIELD_ID = "a766a160-506c-4212-9e5e-8ecd1d530eb4";
const CUSTOMER_ORGANIZATION_FIELD_ID = "e4ea7c84-e998-482e-8bd2-34657a3ff23c";
const CUSTOMER_VIP_ORGANIZATION_FIELD_ID =
  "3e64e7d1-b1d2-4c5a-a546-b4f493dc4f57";
const ORGANIZATION_ID = "3426e3f7-c316-416e-b7a1-d2a1bce17a4";
const ORGANIZATION_USERS_FIELD_ID = "3c5f6e76-a124-4f9a-a944-c75f55495859";
const ORGANIZATION_CUSTOMERS_FIELD_ID = "8d84e22b-ced7-46d7-8ffb-78b74477553a";
const ORGANIZATION_VIP_CUSTOMERS_FIELD_ID =
  "e0c1e5c4-71ae-4584-9e8b-fd1ac8c3b577";
const ORDER_CUSTOMER_FIELD_ID = "77c79b5e-b298-44b2-9648-d417c92a282b";
const USER_ORGANIZATION_FIELD_ID = "ae21f2fb-9174-49de-9576-632d859a5dd1";

const USER: Entity = {
  id: "075c5413-42c3-4445-af6a-d8e5b8cbf53b",
  name: "User",
  displayName: "User",
  pluralDisplayName: "Users",
  fields: [
    {
      id: "053e75d0-9f02-4182-8f61-46fbdbaa71bd",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "a4e0c058-5768-4481-9da9-e48c73ab224d",
      name: "name",
      displayName: "Name",
      required: true,
      searchable: false,
      dataType: EnumDataType.SingleLineText,
    },
    {
      id: "e3fa6ddd-ad36-48ce-8042-9c0aa576e5a9",
      name: "bio",
      displayName: "Bio",
      required: true,
      searchable: false,
      dataType: EnumDataType.MultiLineText,
    },
    {
      id: "8c5c4130-94b0-4ce4-a4cb-4e42bf7a9b37",
      name: "email",
      displayName: "Email",
      required: true,
      searchable: false,
      dataType: EnumDataType.Email,
    },
    {
      id: "71ba3f5e-7324-4ace-af95-d4bcea8f8368",
      name: "age",
      displayName: "Age",
      required: true,
      searchable: false,
      dataType: EnumDataType.WholeNumber,
    },
    {
      id: "b491038d-f588-45e3-b97f-9074f3ed8c83",
      name: "birthDate",
      displayName: "Birth Date",
      required: true,
      searchable: false,
      dataType: EnumDataType.DateTime,
      properties: { dataOnly: false },
    },
    {
      id: "9fa9604e-f9ab-45fb-b8bd-557ae10eda8c",
      name: "score",
      displayName: "Score",
      required: true,
      searchable: false,
      dataType: EnumDataType.DecimalNumber,
    },
    {
      id: USER_ORGANIZATION_FIELD_ID,
      name: "organization",
      displayName: "Organization",
      required: false,
      searchable: false,
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION_ID,
        relatedFieldId: ORGANIZATION_USERS_FIELD_ID,
        allowMultipleSelection: false,
      },
    },
    {
      id: "1a34cc0e-91dd-4ef2-b8eb-df5a44154a21",
      name: "interests",
      displayName: "Interests",
      required: true,
      searchable: false,
      dataType: EnumDataType.MultiSelectOptionSet,
      properties: {
        options: [
          { label: "Programming", value: "programming" },
          { label: "Design", value: "design" },
        ],
      },
    },
    {
      id: "daa757a6-4e15-4afc-a6e3-d4366d64367a",
      name: "priority",
      displayName: "Priority",
      required: true,
      searchable: false,
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ],
      },
    },
    {
      id: "e88e745f-e4a0-414a-b43d-99d7728d1207",
      name: "isCurious",
      displayName: "Is Curious",
      required: true,
      searchable: false,
      dataType: EnumDataType.Boolean,
    },
    {
      id: "e8b7aca3-e761-4d0c-9196-b983d63ae80d",
      name: "location",
      displayName: "Location",
      required: true,
      searchable: false,
      dataType: EnumDataType.GeographicLocation,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const ORDER: Entity = {
  id: "dc63b5ef-e386-4a1c-b764-8926dd3066b8",
  name: "Order",
  displayName: "Order",
  pluralDisplayName: "Orders",
  fields: [
    {
      id: "77f9b90c-d304-4d2f-a4de-82d9d08ab291",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "67063f41-e123-4c19-9707-5df92df469a4",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "b77e5adf-71ce-4b22-b37b-f8641e277032",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "77c79b5e-b298-44b2-9648-d417c92a282b",
      name: "customer",
      displayName: "Customer",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_ORDERS_FIELD_ID,
      },
      required: true,
      searchable: false,
    },
    {
      id: "474eda0e-4ad1-4ab6-9cd5-bfde089a833c",
      name: "status",
      displayName: "Status",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "In Progress",
            value: "inProgress",
          },
          {
            label: "Done",
            value: "done",
          },
        ],
      },
      required: true,
      searchable: false,
    },
    {
      id: "8ee1d632-078e-4932-8fbd-1470df109821",
      name: "label",
      displayName: "Label",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Fragile",
            value: "fragile",
          },
        ],
      },
      required: false,
      searchable: false,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const ORGANIZATION: Entity = {
  id: ORGANIZATION_ID,
  name: "Organization",
  displayName: "Organization",
  pluralDisplayName: "Organizations",
  fields: [
    {
      id: "afcc24cf-e302-46f7-9457-843a0ec7a9d5",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "4c22d45e-997c-4c9a-8bb8-c7b69c273da1",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "3f34a87a-f392-47bf-bfab-2eb23cdbffd4",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "22c4a27a-6490-4fb8-b951-7f42ded681bc",
      name: "name",
      displayName: "Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: ORGANIZATION_USERS_FIELD_ID,
      name: "users",
      displayName: "Users",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: USER.id,
        relatedFieldId: USER_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      searchable: false,
    },
    {
      id: ORGANIZATION_CUSTOMERS_FIELD_ID,
      name: "customers",
      displayName: "Customers",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      searchable: false,
    },
    // Additional lookup field to the same entity
    {
      id: ORGANIZATION_VIP_CUSTOMERS_FIELD_ID,
      name: "vipCustomers",
      displayName: "VIP Customers",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_VIP_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      searchable: false,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const CUSTOMER: Entity = {
  id: CUSTOMER_ENTITY_ID,
  name: "Customer",
  displayName: "Customer",
  pluralDisplayName: "Customers",
  fields: [
    {
      id: "492ba140-5dde-419a-a087-199ddb8b2dc0",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "d4d95cff-e8f4-4bd4-b102-fd10c93d5dea",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "68435ba2-711c-4a86-aa8f-af3b693c4433",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "15ca8761-2b26-4893-9306-a6fd384efdce",
      name: "email",
      displayName: "Email",
      dataType: EnumDataType.Email,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "ad93150b-615a-4b95-837e-3b3ab4d378eb",
      name: "firstName",
      displayName: "First Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: false,
      searchable: false,
    },
    {
      id: "6a12fcaa-9e0f-4d4a-b2ce-67d7d896f438",
      name: "lastName",
      displayName: "Last Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: false,
      searchable: false,
    },
    {
      id: "9f1681d5-59ac-4d6a-9fe5-d90832cd32fe",
      name: "isVip",
      displayName: "VIP",
      dataType: EnumDataType.Boolean,
      properties: {},
      required: false,
      searchable: false,
    },
    {
      id: "02242b3d-7f0b-489b-ae83-b772975dea06",
      name: "birthData",
      displayName: "Birth Data",
      dataType: EnumDataType.DateTime,
      properties: {
        timeZone: "localTime",
        dateOnly: true,
      },
      required: false,
      searchable: false,
    },
    {
      id: "fa359cdb-60b1-4a8c-a59b-d70a2370fbd6",
      name: "averageSale",
      displayName: "Average Sale (-1500.00 - 1500.00)",
      dataType: EnumDataType.DecimalNumber,
      properties: {
        minimumValue: 1500,
        maximumValue: -1500,
        precision: 2,
      },
      required: false,
      searchable: false,
    },
    {
      id: "88931847-cfff-4345-8faf-82a762160340",
      name: "favoriteNumber",
      displayName: "Favorite Number (1 - 20)",
      dataType: EnumDataType.WholeNumber,
      properties: {
        minimumValue: 1,
        maximumValue: 20,
      },
      required: false,
      searchable: false,
    },
    {
      id: "75f4b8c8-a1e7-4b83-aef2-b3b0b0c5d0bc",
      name: "geoLocation",
      displayName: "Geographic Location",
      dataType: EnumDataType.GeographicLocation,
      properties: {},
      required: false,
      searchable: false,
    },
    {
      id: "ecd8dbca-3524-4e38-985e-cc72c28f0b99",
      name: "comments",
      displayName: "Comments (up to 500 characters)",
      dataType: EnumDataType.MultiLineText,
      properties: {
        maxLength: 500,
      },
      required: false,
      searchable: false,
    },
    {
      id: "e0d70a60-6a1c-47be-8687-2d07f3e93b0b",
      name: "favoriteColors",
      displayName: "Favorite Colors (multi-select)",
      dataType: EnumDataType.MultiSelectOptionSet,
      properties: {
        options: [
          {
            label: "Red",
            value: "red",
          },
          {
            label: "Green",
            value: "green",
          },
          {
            label: "Purple",
            value: "purple",
          },
          {
            label: "yellow",
            value: "yellow",
          },
        ],
      },
      required: false,
      searchable: false,
    },
    {
      id: "b227bd7a-2fe5-47f8-8f3e-29a2c26104a8",
      name: "customerType",
      displayName: "Customer Type",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Platinum",
            value: "platinum",
          },
          {
            label: "Gold",
            value: "gold",
          },
          {
            label: "Bronze",
            value: "bronze",
          },
          {
            label: "Regular",
            value: "regular",
          },
        ],
      },
      required: false,
      searchable: false,
    },
    {
      id: CUSTOMER_ORGANIZATION_FIELD_ID,
      name: "organization",
      displayName: "Organization",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION.id,
        relatedFieldId: ORGANIZATION_CUSTOMERS_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      searchable: false,
    },
    {
      id: CUSTOMER_VIP_ORGANIZATION_FIELD_ID,
      name: "vipOrganization",
      displayName: "VIP Organization",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION.id,
        relatedFieldId: ORGANIZATION_VIP_CUSTOMERS_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      searchable: false,
    },
    {
      id: CUSTOMER_ORDERS_FIELD_ID,
      name: "orders",
      displayName: "Orders",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORDER.id,
        relatedFieldId: ORDER_CUSTOMER_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: false,
      searchable: false,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const EMPTY: Entity = {
  id: "0c5ad4df-0467-444a-a249-94c2465ae90d",
  name: "Empty",
  displayName: "Empty",
  pluralDisplayName: "Empties",
  fields: [
    {
      id: "d5e8346e-5382-41cb-bcf7-563678709bea",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "26273293-4cd3-4765-b316-07d68ca99d44",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
    {
      id: "97c4cded-8b11-4907-8079-861b2d83125f",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      searchable: false,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const entities: Entity[] = [USER, ORDER, ORGANIZATION, CUSTOMER, EMPTY];

export default entities;
