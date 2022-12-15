type propsType = {
    columns: string[]
}

function THead(props: propsType) {
    return (
        <thead>
        <tr>
            {props.columns.map(col => <th key={col}>{col}</th>)}
        </tr>
        </thead>
    )
}

export default THead;
