import React from 'react'

interface State {

}
interface Props {
    items : any // TODO - type
    onMouseOver : React.MouseEventHandler<any /* TODO */>
    onMouseOut : React.MouseEventHandler<any /* TODO */>
}

export class MyComponent extends React.Component<Props, State> {
    public render() {
        return <div>Your solution here</div>
    }
}

export default MyComponent;
