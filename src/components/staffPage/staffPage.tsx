import React, {useState} from 'react';
import useAxios from 'axios-hooks'
import {
    Button, createStyles,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    TextField, Theme,
    Typography
} from "@material-ui/core";
import './staffPageStyle.scss';
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {COUNTRY_LIST} from "../../constants"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const employee = {
    empFirstName: 'Anton',
    empLastName: 'Nikolaev',
    empLocationCountry: 'Belarus',
    empLocationCity: 'Minsk',
    empPhone: '+37529-678-88-00',
    empSkype: 'anton21',
    empTimezone: 'Europe/Moskow',
    role: 'HR',
    empEmail: 'vlad21@gmail.com'
}


const StaffPage: React.FC = () => {
        let [edit, setEdit] = useState(false);
        let [editTimeZone, setTimeZone] = useState(false);
        let [state, setState] = useState<{ empFirstName: string; empLastName: string; empLocationCountry: string; empLocationCity: string; empPhone: string; empSkype: string; empTimezone: string; role: string; empEmail: string; }>({

                empFirstName: 'Anton',
                empLastName: 'Nikolaev',
                empLocationCountry: 'Belarus',
                empLocationCity: 'Minsk',
                empPhone: '+37529-678-88-00',
                empSkype: 'anton21',
                empTimezone: 'Europe/Moscow',
                role: 'HR',
                empEmail: 'vlad21@gmail.com'

            }
            )
        ;

        const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            const name = event.target.name as keyof typeof state;
            setState({
                ...state,
                [name]: event.target.value,
            });
        };

        const classes = useStyles();


    return (
            <Grid container spacing={3}>
                <Grid className="row" container xs={12} alignItems="center">
                    <Typography className="title" variant="h4" noWrap>
                        {window.location.href.split("/").slice(-2)[0]} page

                    </Typography>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={edit}
                                onChange={() => setEdit(!edit)}
                                name="checkedA"
                                color="primary"
                            />
                        }
                        label=""
                    />

                    <Typography variant="h6" className="switchLabel" noWrap>
                        Edit mode
                    </Typography>
                    {edit ? <Button variant="contained">Save</Button> : ""}
                </Grid>
                <Grid container justify="center" xs={12}>

                    <Grid item xs={6} spacing={2}>
                        <Typography className="subtitle" variant="h5" noWrap>
                            Details
                        </Typography>
                        <Paper>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item spacing={2} alignItems="center">

                                    <TextField id="firstName" label="First name:" InputProps={{readOnly: !edit,}}
                                               defaultValue={employee.empFirstName}/>

                                    <TextField id="lastName" label="Last name:" InputProps={{readOnly: !edit,}}
                                               defaultValue={employee.empLastName}/>
                                </Grid>
                                <Grid item spacing={2} alignItems="center">

                                    <FormControl className={classes.formControl} disabled={!edit}>
                                        <InputLabel id="country">Country</InputLabel>
                                        <Select
                                            labelId="country"
                                            id="country"
                                            onChange={handleChange}
                                            defaultValue={employee.empLocationCountry}
                                            inputProps={{
                                                name: 'empLocationCountry',
                                                id: 'timeZone',
                                            }}
                                        >
                                            { Array.from( COUNTRY_LIST.keys()).map((country) =>
                                                <MenuItem value={country}>{country}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl} disabled={!edit}>
                                        <InputLabel id="timeZone">Time zone</InputLabel>
                                        <Select
                                            labelId="timeZone"
                                            id="timeZone"
                                            onChange={handleChange}
                                            inputProps={{
                                                name: 'empTimezone',
                                                id: 'timeZone',
                                            }}
                                            defaultValue={COUNTRY_LIST.get(state.empLocationCountry)}
                                            value={COUNTRY_LIST.get(state.empLocationCountry)}
                                        >
                                          {typeof COUNTRY_LIST.get(state.empLocationCountry)==='string'?    <MenuItem value={COUNTRY_LIST.get(state.empLocationCountry)}>{COUNTRY_LIST.get(state.empLocationCountry)}</MenuItem>:

                                              Array.from(COUNTRY_LIST.get(state.empLocationCountry)!).map((timeZone) =>
                                                <MenuItem value={timeZone}>{timeZone}</MenuItem>

                                            )
                                             }
                                            {console.log(state)}
                                        </Select>
                                    </FormControl>
                                    <TextField id="name" label="City:" InputProps={{readOnly: !edit,}}
                                               defaultValue={employee.empLocationCity}/>

                                    {editTimeZone ? <Typography variant="h6" noWrap>
                                        Your current time zone is {Intl.DateTimeFormat().resolvedOptions().timeZone}
                                    </Typography> : ``}


                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography className="subtitle" variant="h5" noWrap>
                            Contacts
                        </Typography>
                        <Paper>
                            <Grid>
                                <TextField id="name" label="Phone:" InputProps={{readOnly: !edit,}}
                                           defaultValue={employee.empPhone}/>

                                <TextField id="name" label="Skype:" InputProps={{readOnly: !edit,}}
                                           defaultValue={employee.empSkype}/>

                            </Grid>
                            <TextField id="name" label="Email:" InputProps={{readOnly: !edit,}}
                                       defaultValue={employee.empEmail}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={12} justify="center">
                    <Grid item xs={6}>
                        <Typography variant="h5" className="subtitle subtitle--notRevived" noWrap>
                            Not reviewed candidates
                        </Typography>
                        <div><CandidateMiniCard/></div>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" className="subtitle subtitle--revived" noWrap>
                            Reviewed candidates
                        </Typography>
                        <div></div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
;

export default StaffPage;
