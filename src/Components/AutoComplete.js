import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function CustomAutoComplete(props) {
  return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo={props.freeSolo}
        onChange={props.onChange}
        onInputChange={props.onInputChange}
        options={props.data.map((option) => option[props.identifier])}
        renderInput={(params) => (
          <TextField {...params} required={props.required} label={props.placeholder} placeholder={props.placeholder}  margin="normal" variant="outlined" />
        )}
      />
  );
}

