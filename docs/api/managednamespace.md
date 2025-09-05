# ManagedNamespace API Reference

## Resource Definition

The ManagedNamespace XR (Composite Resource) provides a simple API for namespace creation.

### API Version

- **Group**: `openportal.dev`
- **Version**: `v1alpha1`
- **Kind**: `ManagedNamespace`
- **Scope**: `Cluster` (cluster-scoped resource)

## Specification

### Full Schema

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: <resource-name>
spec:
  name: <string>           # Required: The namespace name to create
```

## Field Descriptions

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `spec.name` | string | The name of the Kubernetes namespace to create | - Must be a valid DNS label<br>- Lowercase alphanumeric or '-'<br>- 1-63 characters<br>- Must match: `^[a-z0-9]([-a-z0-9]*[a-z0-9])?$` |

## Status Fields

The ManagedNamespace controller populates the following status fields:

```yaml
status:
  ready: <boolean>          # Whether the namespace is ready
  phase: <string>           # Current phase of the namespace
  message: <string>         # Status message
  conditions:
    - type: Ready
      status: "True"
      reason: Available
    - type: Synced
      status: "True"
      reason: ReconcileSuccess
```

## Examples

### Simple Example

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-team-namespace
spec:
  name: my-team
```

### Another Example

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: production-namespace
spec:
  name: production
```

## Validation Rules

The `spec.name` field must:
- Be a valid DNS label (lowercase, alphanumeric, hyphens)
- Be between 1 and 63 characters
- Not start or end with a hyphen
- Match the pattern: `^[a-z0-9]([-a-z0-9]*[a-z0-9])?$`

## Composition Behavior

When you create a ManagedNamespace, the composition creates:

1. **Kubernetes Namespace** - A namespace with the specified name
2. **Default Labels** - Standard labels applied by the composition
3. **Default Annotations** - Standard annotations applied by the composition

The composition uses Crossplane's pipeline mode with composition functions to:
- Create the namespace resource
- Apply any platform-wide policies
- Set up default configurations

## Deletion Behavior

When a ManagedNamespace is deleted:

1. The Kubernetes namespace is deleted
2. All resources within the namespace are removed
3. This action cannot be undone

!!! warning "Data Loss"
    Deleting a ManagedNamespace will delete the Kubernetes namespace and **all resources within it**. Ensure you have backups before deletion.