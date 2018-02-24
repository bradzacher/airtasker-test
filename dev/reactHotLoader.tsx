/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

interface RequireImport {
    AppContainer: any;
}

// We create this wrapper so that we only import react-hot-loader for a
// development build.  Small savings. :)
const ReactHotLoader = ENVIRONMENT === 'development'
    ? require<RequireImport>('react-hot-loader').AppContainer
    : ({ children }: any) => React.Children.only(children)

export default ReactHotLoader
