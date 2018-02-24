/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import ReactDOM from 'react-dom'

import ReactHotLoader from './reactHotLoader'
import TestApp from './testApp'

interface RequireImport {
    default: any;
}

const rootEl = document.getElementById('app')

function renderApp(TheApp: any) {
    ReactDOM.render(
        <ReactHotLoader key={1}>
            <TheApp />
        </ReactHotLoader>,
        rootEl,
    )
}

renderApp(TestApp)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./testApp', () => {
        renderApp(require<RequireImport>('./testApp').default)
    })
}

function toggleMobxDevTools() {
    if (localStorage.getItem('hideDevTools')) {
        localStorage.removeItem('hideDevTools')
    } else {
        localStorage.setItem('hideDevTools', 'I LIKE TRAINS')
    }
}
(window as any).toggleMobxDevTools = toggleMobxDevTools
window.addEventListener('keyup', (evt : KeyboardEvent) => {
    if (evt.ctrlKey && evt.key === 'd') {
        toggleMobxDevTools()
    }
})
