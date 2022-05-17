# Dynamic Plugins

React can [lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) load components.
This means the bundled javascript for a component is not loaded until it is needed.

Webpack 5 added [module federation](https://webpack.js.org/concepts/module-federation).
The idea being that instead of lazy loading a component from the same server/container,
you can load a component from a remote server/container. Think microservices for the frontend.

[OCP Console dynamic plugins](https://github.com/openshift/console/blob/master/dynamic-demo-plugin/README.md#proxy-service)
build upon this issue by adding a resource that registers the federated module,
and has extensions indicating how and where that "dynamic plugin" will be loaded into the OCP console.

In addition the OCP console provides dynamic [proxies]((https://github.com/openshift/console/tree/master/frontend/packages/console-dynamic-plugin-sdk) that allow those loaded conponents to communicate with the backends even in other namespaces.

## ACM Dynamic Plugins

ACM will run stand-alone as it needs to support back to OCP 4.6 and dynamic plugins are only available in OCP 4.10+.

ACM will not only serve up the stand alone but also plugins for each of the main navigation pages in ACM.

### Install Changes

ACM console will need to know what version of OCP it is being installed on.
In the case of 4.10+ we will install addition [resources](https://github.com/openshift/console/blob/master/dynamic-demo-plugin/oc-manifest.yaml) to register the plugins with the OCP console.

## Development

### Clone the repo to local
```
git clone https://github.com/stolostron/console.git
```
### Makesure you have logged in to the OCP cluster where ACM is installed on local using "OC login"

### Running console as OCP dynamic plugins

From the root of the `console` repository run:
```
./setup.sh
yarn build:plugins
npm run plugins
```

This will concurrently start the backend server, webpack build watching for updates, and http-server to serve the plugins for the OCP console.   

### [OCP Console Git Repo](https://github.com/openshift/console)

```
git clone git@github.com:openshift/console.git
```

### Running OCP Console in development mode

Build OCP Console

### Revert the following commit
```
https://github.com/openshift/console/pull/11102
```

### Build console backend
```
./build.sh
```

### Everytime you try to setup hybrid console on a new OCP cluster follow these steps on the OCP console root directory
```
rm -rf multicluster.config
export KUBECONFIG=multicluster.config
"oc login" with OCP cluster, if you have spoke clusters then do "oc login" on all the clusters.(multicluster.config will keep record the all cluster info)
source contrib/multicluster-environment.sh 
```

Bridge command
```
./bin/bridge -plugins mce=http://localhost:3001 -plugins acm=http://localhost:3002 --plugin-proxy='{"services":[{"consoleAPIPath":"/api/proxy/plugin/mce/console/","endpoint":"https://localhost:4000","authorize":true},{"consoleAPIPath":"/api/proxy/plugin/acm/console/","endpoint":"https://localhost:4000","authorize":true}]}'
```

Bridge variables can also be passes in as environment variables

```
BRIDGE_PLUGIN_PROXY='{"services":[{"consoleAPIPath":"/api/proxy/plugin/mce/console/","endpoint":"https://localhost:4000","authorize":true},{"consoleAPIPath":"/api/proxy/plugin/acm/console/","endpoint":"https://localhost:4000","authorize":true}]}'
```

### Dynamic Plugin support for getting resources

Q: What support does OCP have for realtime data with websockets?

> `useWatchK8sResource` and `useWatchK8sResources` are the utilities we have right now for that

```
const [data, loaded, error] = useK8sWatchResource<CustomizationResource[]>({
    groupVersionKind: {
        group: 'console.openshift.io',
        version: 'v1',
        kind: 'ConsoleLink',
    },
    isList: true,
    namespaced: false,
});
```
