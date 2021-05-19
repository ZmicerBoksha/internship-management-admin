import React, { useEffect } from 'react';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import { useForm } from 'react-hook-form';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LoginTopBar from './loginTopBar';
import useAxios from 'axios-hooks';
import { useHistory, Redirect } from 'react-router-dom';
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxHeight: '700px',
      maxWidth: '500px',
      backgroundColor: 'white',

      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '95%',
    },
    learnMore: {
      marginLeft: theme.spacing(8),
    },
  }),
);
interface ILoginForm {
  email: string;
  password: string;
}
interface ILoginResponse {
  token: string;
}
const Authorization = () => {
  const history = useHistory();
  const classes = useStyles();
  const [{ data: response, loading, error }, executePost] = useAxios<ILoginResponse>(
    {
      headers: { Authorization: '' },
      url: `/auth/login`,
      method: 'POST',
    },
    { manual: true },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  useEffect(() => {
    if (!!response) {
      console.log(response.token);
      window.localStorage.setItem('token', response.token);

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    // if (!!error) {
    //   alert('Something went wrong please try again');
    // }
  }, [response]);

  // console.log('loading', loading, 'response', response?.token, 'error', error);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (formData: ILoginForm) => {
    executePost({
      data: {
        ...formData,
      },
    });
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Card className={classes.root}>
          <CardMedia>
            <LoginTopBar subname="Authorization" />
          </CardMedia>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  {...register('email', {
                    required: true,
                  })}
                  id="outlined"
                  label="Username"
                  type="email"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <div style={{ color: 'red' }}>{errors.email && 'Please fill Form'}</div>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    {...register('password', {
                      required: true,
                    })}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <div style={{ color: 'red' }}>{errors.password && 'Please fill Form'}</div>
                </FormControl>
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Authorization;
