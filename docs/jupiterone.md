# DigitalOcean Integration with JupiterOne

## DigitalOcean + JupiterOne Integration Benefits

TODO: Iterate the benefits of ingesting data from the provider into JupiterOne.
Consider the following examples:

- Visualize {{provider}} services, teams, and users in the JupiterOne graph.
- Map {{provider}} users to employees in your JupiterOne account.
- Monitor changes to {{provider}} users using JupiterOne alerts.

## How it Works

TODO: Iterate significant activities the integration enables. Consider the
following examples:

- JupiterOne periodically fetches services, teams, and users from {{provider}}
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

TODO: Iterate requirements for setting up the integration. Consider the
following examples:

- {{provider}} supports the OAuth2 Client Credential flow. You must have a
  Administrator user account.
- JupiterOne requires a REST API key. You need permission to create a user in
  {{provider}} that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In {{provider}}

TODO: List specific actions that must be taken in the provider. Remove this
section when there are no actions to take in the provider.

1. [Generate a REST API key](https://example.com/docs/generating-api-keys)

### In JupiterOne

TODO: List specific actions that must be taken in JupiterOne. Many of the
following steps will be reusable; take care to be sure they remain accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **{{provider}}** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this {{provider}}
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- {{additional provider-specific settings}} Enter the **{{provider}} API Key**
  generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **{{provider}}** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources            | Entity `_type`                      | Entity `_class`     |
| -------------------- | ----------------------------------- | ------------------- |
| Account              | `digitalocean_account`              | `Account`           |
| Alert Policy         | `digitalocean_alert_policy`         | `Rule`              |
| Certificate          | `digitalocean_certificate`          | `Certificate`       |
| Container Registry   | `digitalocean_container_registry`   | `Repository`        |
| Database             | `digitalocean_database`             | `Database`          |
| Database Backup      | `digitalocean_database_backup`      | `Backup`            |
| Database Certificate | `digitalocean_database_certificate` | `Certificate`       |
| Domain               | `digitalocean_domain`               | `Domain`            |
| Domain Record        | `digitalocean_domain_record`        | `DomainRecord`      |
| Droplet              | `digitalocean_droplet`              | `Host`              |
| Droplet Snapshot     | `digitalocean_droplet_snapshot`     | `Image`             |
| Kubernetes Cluster   | `digitalocean_kubernetes_cluster`   | `Cluster`           |
| Project              | `digitalocean_project`              | `Project`           |
| Region               | `digitalocean_region`               | `Site`              |
| Reserved IP          | `digitalocean_reserved_ip`          | `IpAddress`         |
| SSH Key              | `digitalocean_ssh_key`              | `Key`, `AccessKey`  |
| Volume               | `digitalocean_volume`               | `DataStore`, `Disk` |
| Volume Snapshot      | `digitalocean_volume_snapshot`      | `Image`             |

### Relationships

The following relationships are created:

| Source Entity `_type`   | Relationship `_class` | Target Entity `_type`               |
| ----------------------- | --------------------- | ----------------------------------- |
| `digitalocean_account`  | **HAS**               | `digitalocean_container_registry`   |
| `digitalocean_account`  | **HAS**               | `digitalocean_project`              |
| `digitalocean_account`  | **HAS**               | `digitalocean_ssh_key`              |
| `digitalocean_database` | **HAS**               | `digitalocean_database_backup`      |
| `digitalocean_database` | **HAS**               | `digitalocean_database_certificate` |
| `digitalocean_domain`   | **HAS**               | `digitalocean_domain_record`        |
| `digitalocean_droplet`  | **HAS**               | `digitalocean_alert_policy`         |
| `digitalocean_droplet`  | **HAS**               | `digitalocean_droplet_snapshot`     |
| `digitalocean_droplet`  | **USES**              | `digitalocean_reserved_ip`          |
| `digitalocean_droplet`  | **USES**              | `digitalocean_volume`               |
| `digitalocean_project`  | **HAS**               | `digitalocean_database`             |
| `digitalocean_project`  | **HAS**               | `digitalocean_domain`               |
| `digitalocean_project`  | **HAS**               | `digitalocean_droplet`              |
| `digitalocean_project`  | **HAS**               | `digitalocean_kubernetes_cluster`   |
| `digitalocean_project`  | **HAS**               | `digitalocean_reserved_ip`          |
| `digitalocean_project`  | **HAS**               | `digitalocean_volume`               |
| `digitalocean_region`   | **HOSTS**             | `digitalocean_droplet`              |
| `digitalocean_region`   | **HOSTS**             | `digitalocean_reserved_ip`          |
| `digitalocean_region`   | **HOSTS**             | `digitalocean_volume`               |
| `digitalocean_volume`   | **HAS**               | `digitalocean_volume_snapshot`      |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type`       | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------------- | --------------------- | --------------------- | --------- |
| `digitalocean_alert_policy` | **NOTIFIES**          | `*slack_channel*`     | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
