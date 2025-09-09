# ManagedNamespace Template

Crossplane template for Kubernetes namespace management.

## Overview

This template provides a simple namespace provisioning solution using Crossplane v2 with cluster-scoped XRs.

## Components

- **configuration/xrd.yaml** - Defines the `ManagedNamespace` custom resource API
- **configuration/composition.yaml** - Implements namespace creation
- **examples/** - Sample configurations

## Usage

### Basic Namespace

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-namespace
spec:
  name: my-namespace
```

## Installation

The template is deployed via the GitHub Actions release workflow which:
1. Builds the Crossplane package (.xpkg)
2. Pushes to GitHub Container Registry
3. Creates a catalog entry for Flux

## Documentation

This template includes TechDocs documentation that can be built and previewed locally.

### Prerequisites

Install Python dependencies:
```bash
# Using pip
pip3 install -r requirements.txt

# Or using brew + pip
brew install python@3.11
pip3 install -r requirements.txt
```

### Building Documentation Locally

```bash
# Build the documentation
mkdocs build

# Serve with live reload for development
mkdocs serve
# Then open http://127.0.0.1:8000 in your browser

# Build for production (creates 'site' directory)
mkdocs build --strict
```

The documentation is automatically discovered by Backstage through the XRD annotations.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | yes | Namespace name (DNS-1123 compliant) |

## Restaurant Analogy

Think of this template as **reserving a table**:
- The namespace is your dedicated space in the Kubernetes cluster
- The ManagedNamespace XR is your reservation request
- Crossplane handles the actual table setup