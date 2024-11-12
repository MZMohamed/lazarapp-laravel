import React, {useState, useEffect} from 'react'
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head } from '@inertiajs/react'
import Header from "@/Components/app/Header";

import { router } from '@inertiajs/react'

// components
import CreateJobFormContainer from "@/Components/app/admin/jobs/CreateJobFormContainer";

//mui
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, InputLabel, FormControl, Select, MenuItem   } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 200
  },
  submitButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const UserCreate = () => {
    const { user } = usePage().props.auth
    const classes = useStyles();

    // const [group, setGroup] = useState('');
    const [open, setOpen] = useState(false);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    // const handleClick = event => {
    //   setGroup(event.target.value);
    // };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const [values, setValues] = useState({
        name: '',
        password: '',
        phone: '',
        email: '',
        group: ''

    })

    // add validation to form
    // const [error, setError] = useState(false)

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
          } )

      }

    const handleSubmit = event => {
        event.preventDefault();

        console.log('clicked');
        router.post('/users', values);

        // setValues({ name: "", password: "", phone: "", email: "", group: "" });
    }

    return (
      <MaterialUiLayout>
        <Head title="Create User" />
        <Header user={user} />
        <Typography variant="h5" color='secondary'>Create User</Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CreateJobFormContainer>


          <TextField
            required
            name="name"
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            value={values.name}
          />
          <TextField
            required
            name="password"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            value={values.password}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Group
            </InputLabel>
            <Select
              labelWidth={labelWidth}
              name="group"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={values.group}
              onChange={handleChange}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"driver"}>Driver</MenuItem>
              <MenuItem value={"client"}>Client</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="email"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            value={values.email}
          />
          <input type="submit" value="Create User" className={classes.submitButton}/>
          </CreateJobFormContainer>
        </form>
      </MaterialUiLayout>
    );
}

export default UserCreate