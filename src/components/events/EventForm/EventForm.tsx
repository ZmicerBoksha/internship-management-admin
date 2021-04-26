import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => {
  return createStyles({
    pageWrap: {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35,
    },
  });
});

type EventFormProps = {
  id?: string;
  title?: string;
};

const EventForm: FunctionComponent<EventFormProps> = ({ id, title }) => {
  const { eventId } = useParams<{ eventId: string | undefined }>();

  const classes = useStyles();

  const [tab, setTab] = useState('');
  const tabChange = (event: ChangeEvent<{ value: unknown }>) => {
    setTab(event.target.value as string);
  };

  const [format, setFormat] = useState('');
  const formatChange = (event: ChangeEvent<{ value: unknown }>) => {
    setFormat(event.target.value as string);
  };

  const [englishLevel, setEnglishLevel] = useState('');
  const englishLevelChange = (event: ChangeEvent<{ value: unknown }>) => {
    setEnglishLevel(event.target.value as string);
  };

  return (
    <div className={classes.pageWrap}>
      <Typography variant="h1" component="h1">
        {eventId ? `Edit event ( id = ${eventId} )` : `Add event`}
      </Typography>
      <form>
        {/* ---------------  // ---------------- */}
        <div className={'main_values'}>
          <div className="title">
            <Typography variant="h4" component="h2">
              Main values
            </Typography>
          </div>
          <div>
            <TextField id="title" label="Title" />
          </div>
          <div>
            <TextareaAutosize aria-label="Body event" rowsMin={3} placeholder="Enter event body text" />
          </div>
        </div>

        {/* ---------------  // ---------------- */}
        <div className={'custom_value'}>
          <div className="title">
            <Typography variant="h4" component="h2">
              Event custom info
            </Typography>
          </div>
          <div>
            <FormControl>
              <InputLabel id="tab-label">Tab</InputLabel>
              <Select labelId="tab-label" id="tab" value={tab} onChange={tabChange}>
                <MenuItem value={'Planned'}>Planned</MenuItem>
                <MenuItem value={'In-progress'}>In-progress</MenuItem>
                <MenuItem value={'Archive'}>Archive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel id="format-label">Format</InputLabel>
              <Select labelId="format-label" id="format" value={format} onChange={formatChange}>
                <MenuItem value={'Online'}>Online</MenuItem>
                <MenuItem value={'Offline'}>Offline</MenuItem>
              </Select>
            </FormControl>
            {format === 'Offline' && (
              <div className="location">
                <>Выбрать страну</>
                <>Выбрать город</>
              </div>
            )}
          </div>
        </div>

        {/* ---------------  // ---------------- */}
        <div className={'iamge_info'}>
          <div className="title">
            <Typography variant="h4" component="h2">
              Image info
            </Typography>
          </div>
          <div className={''}>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </div>
          <div>
            <TextField id="alt_for_image" label="Alt for image" />
          </div>
        </div>

        {/* ---------------  // ---------------- */}
        <div className={'requirements'}>
          <div className="title">
            <Typography variant="h4" component="h2">
              Requirements
            </Typography>
          </div>
          <div>
            <FormControl>
              <InputLabel id="englishLevel-label">English level</InputLabel>
              <Select labelId="englishLevel-label" id="englishLevel" value={englishLevel} onChange={englishLevelChange}>
                <MenuItem value={'Beginner (A1)'}>Beginner (A1)</MenuItem>
                <MenuItem value={'Elementary (A2)'}>Elementary (A2)</MenuItem>
                <MenuItem value={'Pre-Intermediate (A2/B1)'}>Pre-Intermediate (A2/B1)</MenuItem>
                <MenuItem value={'Intermediate (B1)'}>Intermediate (B1)</MenuItem>
                <MenuItem value={'Upper-Intermediate (B2)'}>Upper-Intermediate (B2)</MenuItem>
                <MenuItem value={'Advanced (C1)'}>Advanced (C1)</MenuItem>
                <MenuItem value={'Proficiency (C2)'}>Proficiency (C2)</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            Technologies
            {/* <Autocomplete
              multiple
              id="tags-standard"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Multiple values"
                  placeholder="Favorites"
                />
              )}
            />   */}
            <Autocomplete
              multiple
              id="size-small-outlined-multi"
              size="small"
              options={top100Films}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Size small" placeholder="Favorites" />
              )}
            />
          </div>
        </div>

        {/* ---------------  // ---------------- */}
        <div className={'dates_info'}>
          <div className="title">
            <Typography variant="h4" component="h2">
              Dates info
            </Typography>
          </div>
          <div>
            <TextField
              id="startDate"
              label="Event start"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="finishDate"
              label="Event finish"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="dateEndOfAsseptin"
              label="Date end of asseptin"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField id="duration" label="Duration" />
          </div>
        </div>
      </form>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ title: 'JavaScript' }];

export default EventForm;
