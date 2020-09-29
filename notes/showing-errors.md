# Showing Error Messages
We're not showing any error messages in our form, but you can of course easily add some.

The form inputs (```<Input />```  component) already receives the information whether it's invalid or not. You could of course easily add some conditionally rendered element inside of that component.

For example (inside ```<Input />```  component function):

```
// all the other code from the videos
 
let validationError = null;
if (props.invalid && props.touched) {
    validationError = <p>Please enter a valid value!</p>;
}
 
return (
     <div className={classes.Input}>
         <label className={classes.Label}>{props.label}</label>
         {inputElement}
         {validationError}
     </div>
 );
```

This could of course be finetuned. You could also pass the value type (e.g. ```"email address"``` ) as a prop:

```validationError = <p>Please enter a valid {props.valueType}</p>; ```

You could also receive the complete error message as a prop:

```validationError = <p>{props.errorMessage}</p>; ```

And of course, also don't forget to style the messages if you want to do that:

```validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;```

In your CSS file, you could have:
```
.ValidationError {
    color: red;
    margin: 5px 0;
} 
```