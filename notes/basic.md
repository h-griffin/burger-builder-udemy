- planning a react app
    - component tree/structure
    - application state
    - components vs containers

![component tree/structure](assets/component-tree.png)
![app state and wireframe layout](assets/state-layout.png)


> $ npm run eject 
**webpack.config.dev.js**
**webpack.config.prod.js**

```
test: /\.css$/,
use: [
    require.resolve('style-loader'),
...
modules: true,
localIdentName: '[name]__[local]__[hash:base64:5]'

```

componetns - stateless
containers - stateful
