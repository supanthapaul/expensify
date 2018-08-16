import React from 'react';
//http://momentjs.com
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         description: props.expense ? props.expense.description : '',
         note: props.expense ? props.expense.note : '',
         amount: props.expense ? (props.expense.amount / 100).toString() : '',   // convert to dollar
         createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
         calenderFocused: false,
         error: ''
      };
   }

   onDescriptionChange = (e) => {
      const description = e.target.value;
      this.setState(() => ({
         description
      }));
   };
   onNoteChange = (e) => {
      const note = e.target.value;
      this.setState(() => ({
         note
      }))
   };
   onAmountChange = (e) => {
      const amount = e.target.value;
      // either blank amount or formatted amount
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
         this.setState(() => ({
            amount
         }));
      }
   };
   onDateChange = (createdAt) => {
      if (createdAt) {
         this.setState(() => ({
            createdAt
         }));
      }
   };
   onFocusChange = ({ focused }) => {
      this.setState(() => ({
         calenderFocused: focused
      }))
   };

   onSubmit = (e) => {
      e.preventDefault();

      if (!this.state.description || !this.state.amount) {
         // set error state
         this.setState(() => ({ error: 'Please provide Description and Amount.' }));
      } else {
         // clear the error
         this.setState(() => ({ error: '' }));

         // onSubmit need to be passed whereever this component is used
         // form inputs will be passed to the function
         this.props.onSubmit({
            description: this.state.description,
            amount: parseFloat(this.state.amount, 10) * 100, // format to cents
            createdAt: this.state.createdAt.valueOf(),   // get the timestamp from date picker
            note: this.state.note
         });
      }
   }

   render() {
      return (
         <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
            <input
               type="text"
               className="text-input"
               placeholder="Description"
               autoFocus
               value={this.state.description}
               onChange={this.onDescriptionChange}
            />
            <input
               type="text"
               className="text-input"
               placeholder="Amount"
               value={this.state.amount}
               onChange={this.onAmountChange}
            />
            {/* Using react-dates library */}
            {/* https://github.com/airbnb/react-dates */}
            <SingleDatePicker
               date={this.state.createdAt}
               onDateChange={this.onDateChange}
               focused={this.state.calenderFocused}
               onFocusChange={this.onFocusChange}
               numberOfMonths={1}
               // Make every date available
               isOutsideRange={() => false}
            />
            <textarea
               placeholder="Add a note for your expense (optional)"
               className="text-area"
               value={this.state.note}
               onChange={this.onNoteChange}
            >
            </textarea>
            <div>
               <button className="button">Save Expense</button>
            </div>
         </form>
      );
   }
}

export default ExpenseForm;