import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import Select from 'react-select';
import { Editor, EditorState } from 'draft-js';

const options = [{ value: '1', label: 'Day 1' },
{ value: '2', label: 'Day 2' },
{ value: '3', label: 'Day 3' },
];

const topicOptions = [{ value: 'Science', label: 'Science' },
{ value: 'Maths', label: 'Maths' },
{ value: 'English', label: 'English' },
];


class Form extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedDay: { value: '', label: '' },
         selectedTopic: { value: '', label: '' },
         formErrors: { selectedDay: '', selectedTopic: '' },
         selectedDayValid: false,
         selectedTopicValid: false,
         formValid: false,
         editorState: EditorState.createEmpty()

      }
   }

   validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let selectedDayValid = this.state.selectedDayValid;
      let selectedTopicValid = this.state.selectedTopicValid;
      const valueLen = value.label.length != 0;
      if (!valueLen) {
         fieldValidationErrors[fieldName] = ' is not selected.';
      }
      switch (fieldName) {
         case 'selectedDay':
            selectedDayValid = valueLen;
            break;
         case 'selectedTopic':
            selectedTopicValid = valueLen;
            break;
         default:
            break;
      }

      this.setState({
         formErrors: fieldValidationErrors,
         selectedDayValid: selectedDayValid,
         selectedTopicValid: selectedTopicValid
      }, this.validateform);
   }

   validateform() {
      this.setState({ formValid: this.state.selectedDayValid && this.state.selectedTopicValid });
   }

   handleUserInput(name, e) {
      const value = e;
      this.setState({ [name]: value },
         () => { this.validateField(name, value) });
   }

   errorClass(error) {
      return (error.length === 0 ? '' : 'has-error');

   }

   onChange = (editorState) => this.setState({ editorState });

   setEditor = (editor) => {
      this.editor = editor;
   };
   focusEditor = () => {
      if (this.editor) {
         this.editor.focus();
      }
   };


   render() {
      return (
         <div className="panel-default">
            <FormErrors formErrors={this.state.formErrors} />
            <form className="demoform">
               <h2></h2>
               <div className={`form-group ${this.errorClass(this.state.formErrors.selectedDay)}`}>
                  <label htmlFor="selectedDay"> Day </label>

                  <Select
                     value={this.state.selectedDay}
                     onChange={(event) => this.handleUserInput('selectedDay', event)}
                     options={options}
                  />
               </div>
               <div className={`form-group ${this.errorClass(this.state.formErrors.selectedTopic)}`}>
                  <label htmlFor="selectedTopic"> Topic </label>

                  <Select
                     value={this.state.selectedTopic}
                     onChange={(event) => this.handleUserInput('selectedTopic', event)}
                     options={topicOptions}
                  />
               </div>
               <div style={styles.editor} onClick={this.focusEditor}>
                  <Editor
                     ref={this.setEditor}
                     editorState={this.state.editorState}
                     onChange={this.onChange}
                  />
               </div>
               <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                  Submit
               </button>
            </form>
         </div>
      )

   }
}

const styles = {
   editor: {
      border: '1px solid grey',
      minHeight: '6em'
   }
};


export default Form;