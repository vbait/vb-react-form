export default `
const Example = () => {
    return (
        <div>
            <div>
                <h5>Input Field</h5>
                <Field name="input" component={Field.Input}/>
            </div>
            <div>
                <h5>Radio Field</h5>
                <Field name="radio" component={Field.Radio}/>
            </div>
            <div>
                <h5>Checkbox Field</h5>
                <Field name="checkbox" component={Field.Checkbox}/>
            </div>
            <div>
                <h5>RadioGroup Field</h5>
                <Field name="radio-group" options={[{value: '1', label: 'Value 1'}, {value: '2', label: 'Value 2'}]} component={Field.RadioGroup}/>
            </div>
            <div>
                <h5>CheckboxGroup Field</h5>
                <Field name="checkbox-group" options={[{value: '1', label: 'Value 1'}, {value: '2', label: 'Value 2'}]} component={Field.CheckboxGroup}/>
            </div>
            <div>
                <h5>Select Field</h5>
                <Field name="select" options={[{value: '1', label: 'Value 1'}, {value: '2', label: 'Value 2'}]} component={Field.Select}/>
            </div>
            <div>
                <h5>Multi-Select Field</h5>
                <Field name="select" multiple options={[{value: '1', label: 'Value 1'}, {value: '2', label: 'Value 2'}]} component={Field.Select}/>
            </div>
            <div>
                <h5>Text Field</h5>
                <Field name="text" component={Field.Text}/>
            </div>
        </div>
    )
};

ReactDOM.render(<Example />, mountNode);
`
