# Quick Start Guide

This guide will help you create your first ManagedNamespace in less than 5 minutes.

## Prerequisites

Before you begin, ensure you have:

- ✅ Kubernetes cluster (v1.28+)
- ✅ Crossplane installed (v1.17+)
- ✅ ManagedNamespace template installed
- ✅ kubectl configured

## Step 1: Create a Simple Namespace

Create a file named `my-namespace.yaml`:

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-team-namespace
spec:
  name: my-team
```

Apply the resource:

```bash
kubectl apply -f my-namespace.yaml
```

## Step 2: Verify Creation

Check the status of your ManagedNamespace:

```bash
# Check the XR status
kubectl get managednamespace my-team-namespace

# Check if the namespace was created
kubectl get namespace my-team

# View the composed resources
kubectl describe managednamespace my-team-namespace
```

## Step 3: Create Another Namespace

Create another namespace with a different name:

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: production-namespace
spec:
  name: production
```

Apply the resource:

```bash
kubectl apply -f production-namespace.yaml
```

## Examples

### Team Namespace

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: team-alpha-namespace
spec:
  name: team-alpha
```

### Application Namespace

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: app-frontend-namespace
spec:
  name: app-frontend
```

## Troubleshooting

### Namespace Not Created

Check the XR status:
```bash
kubectl get managednamespace my-team-namespace -o yaml
```

Look for conditions and events:
```bash
kubectl describe managednamespace my-team-namespace
```

### Check Composition

Verify the composition is working:
```bash
kubectl get compositions managednamespaces
```

## Next Steps

- 📖 Review the [API Reference](../api/managednamespace.md)
- 🔧 Check the main [documentation](../index.md)
- 📦 Explore the [GitHub repository](https://github.com/open-service-portal/template-namespace)