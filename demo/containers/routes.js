export default [
  {
    label: 'Home',
    path: '/',
    component: require('./Home').default,
  },
  {
    label: 'Docs',
    path: '/docs',
    component: require('./Docs').default,
  },
  {
    label: 'Form Example',
    path: '/form-example',
    component: require('./FormV1').default,
  },
  {
    label: 'Form List',
    path: '/form-list',
    component: require('./FormList/wrapper').default,
  },
  // {
  //   label: 'Validators',
  //   path: '/validators',
  //   component: require('./Validators').default,
  // },
  // {
  //   label: 'Fields',
  //   path: '/fields',
  //   component: require('./Fields').default,
  // },
  // {
  //   label: 'Form + FormField',
  //   path: '/form',
  //   component: require('./Form').default,
  // },
  // {
  //   label: 'Form Example',
  //   path: '/form-example',
  //   component: require('./FormExample').default,
  // },
  // {
  //   label: 'Form Demo',
  //   path: '/form-demo',
  //   component: require('./FormsDemo').default,
  // },
]