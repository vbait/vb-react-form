export default [
  {
    label: 'Home',
    path: '/',
    component: require('./Home').default,
  },
  {
    label: 'Validators',
    path: '/validators',
    component: require('./Validators').default,
  },
  {
    label: 'Fields',
    path: '/fields',
    component: require('./Fields').default,
  },
  {
    label: 'Form + FormField',
    path: '/form',
    component: require('./Form').default,
  },
  {
    label: 'Form Example',
    path: '/form-example',
    component: require('./FormExample').default,
  },
  {
    label: 'Form Demo',
    path: '/form-demo',
    component: require('./FormsDemo').default,
  },
]