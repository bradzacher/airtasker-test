declare module 'react-jss' {
    import React from 'react'

    interface WithStyles<T extends string> {
        classes : {
            [k in T] : string
        }
    }
    interface StyledComponentProps<T extends string> {
        classes ?: Partial<{
            [k in T] : string
        }>
    }

    export default function injectSheet<TClasses>(classes : TClasses)
        : (<TP>(component : React.ComponentType<TP & WithStyles<keyof TClasses>>) =>
            React.ComponentType<TP & StyledComponentProps<keyof TClasses>>)
}
