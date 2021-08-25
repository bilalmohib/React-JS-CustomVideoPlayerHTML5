import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import PauseCircleOutlineTwoToneIcon from '@material-ui/icons/PauseCircleOutlineTwoTone';
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import PictureInPictureAltTwoToneIcon from '@material-ui/icons/PictureInPictureAltTwoTone';
import "./controls.css";

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    background: "rgba(0,0,0,0)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#fff",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
  bottomIconsMobile: {
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
    marginLeft: 150
  },
  volumeSlider: {
    width: 100,
    marginBottom: -15,
    color: "#fff",
  },
  volumeSliderMobile: {
    width: 80,
    marginBottom: -16,
    color: "#fff",
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {
    color: "white"
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    color: "white",
    background: "#fff"
  },
  rail: {
    height: 5,
    borderRadius: 4,
    color: "grey",
  },
})(Slider);

const PrettoSliderMobile = withStyles({
  root: {
    height: 8,
    marginTop:-15
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {
    color: "white"
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    color: "white",
    background: "#fff"
  },
  rail: {
    height: 5,
    borderRadius: 4,
    color: "grey",
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onHandlePIP,
      onBookmark,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div ref={ref} className={classes.controlsWrapper} >
        {/* View for Desktop and Tablets*/}
        <div id="DesktopPlayer">
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ flexGrow: 4 }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              style
              style={{ padding: 16 }}
            >
              <Grid item>
                <Typography variant="h5" style={{ color: "#fff" }}>
                  Nayyar Noor Aey Jazbae Dil Gar Mein Chahoon
                </Typography>
              </Grid>

            </Grid>
            {/* <Grid container direction="row" alignItems="center" justify="center">
              <IconButton
                onClick={onRewind}
                className={classes.controlIcons}
                aria-label="rewind"
              >
                <FastRewindIcon
                  className={classes.controlIcons}
                  fontSize="inherit"
                />
              </IconButton>
              <IconButton
                onClick={onPlayPause}
                className={classes.controlIcons}
                aria-label="play"
              >
                {playing ? (
                  <PauseIcon fontSize="inherit" />
                ) : (
                  <PlayArrowIcon fontSize="inherit" />
                )}
              </IconButton>
              <IconButton
                onClick={onFastForward}
                className={classes.controlIcons}
                aria-label="forward"
              >
                <FastForwardIcon fontSize="inherit" />
              </IconButton>
            </Grid> */}
            {/* bottom controls */}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: 16 }}
            >

              <Grid item>
                <Grid container alignItems="center">
                  <IconButton
                    onClick={onPlayPause}
                    style={{ marginLeft: -17 }}
                    className={classes.bottomIcons}
                  >
                    {playing ? (
                      <PauseCircleOutlineTwoToneIcon fontSize="large" />
                    ) : (
                      <PlayCircleOutlineTwoToneIcon fontSize="large" />
                    )}
                  </IconButton>


                  <Button
                    variant="text"
                    onClick={
                      onChangeDispayFormat
                      //     () =>
                      //   setTimeDisplayFormat(
                      //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                      //   )
                    }
                  >
                    <Typography
                      variant="body1"
                      style={{ color: "#fff", marginLeft: 16 }}
                    >
                      {elapsedTime}/{totalDuration}
                    </Typography>
                  </Button>
                </Grid>

              </Grid>
              <Grid item>
                {/* <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}X</Typography>
                </Button> */}

                {/* Not Needed for the Client as speed is not needed */}
                {/* <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.75, 0.5, 1, 1.5, 2, 2.5, 2.75, 3, 3.5].map((rate) => (
                      <Button
                        key={rate}
                        //   onClick={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={rate === playbackRate ? "secondary" : "inherit"}
                        >
                          {rate}X
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover> */}
                {/* Not Needed for the Client as speed is not needed */}

                {/* This is the volume buttons */}
                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="large" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className="volumeSlider"
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
                {/* This is the volume buttons */}

                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.bottomIcons}
                >
                  <FullScreen fontSize="large" />
                </IconButton>
                <IconButton

                  className={classes.bottomIcons}
                >
                  {/* Default dropstart button */}
                  <div className="btn-group dropstart">
                    <span type="button" className="PipButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </span>
                    <ul className="dropdown-menu PIPDropDown">
                      {/* Dropdown menu links */}
                      <li onClick={onHandlePIP}><a className="dropdown-item" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-pip mr-3" viewBox="0 0 16 16">
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                          <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z" />
                        </svg>
                        Picture in Picture</a>
                      </li>
                    </ul>
                  </div>
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <PrettoSlider
                  min={0}
                  max={100}
                  ValueLabelComponent={(props) => (
                    <ValueLabelComponent {...props} value={elapsedTime} />
                  )}
                  aria-label="custom thumb label"
                  value={played * 100}
                  onChange={onSeek}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onSeekMouseUp}
                  onDuration={onDuration}
                />
              </Grid>
            </Grid>

          </Grid>

        </div>


        {/* View for Mobile */}
        <div id="MobilePlayer">
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ flexGrow: 4 }}
          >
            {/* <Grid container direction="row" alignItems="center" justify="center">
              <IconButton
                onClick={onRewind}
                className={classes.controlIcons}
                aria-label="rewind"
              >
                <FastRewindIcon
                  className={classes.controlIcons}
                  fontSize="inherit"
                />
              </IconButton>
              <IconButton
                onClick={onPlayPause}
                className={classes.controlIcons}
                aria-label="play"
              >
                {playing ? (
                  <PauseIcon fontSize="inherit" />
                ) : (
                  <PlayArrowIcon fontSize="inherit" />
                )}
              </IconButton>
              <IconButton
                onClick={onFastForward}
                className={classes.controlIcons}
                aria-label="forward"
              >
                <FastForwardIcon fontSize="inherit" />
              </IconButton>
            </Grid> */}
            {/* bottom controls */}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={`MobileControlsBtn`}
            >

              <Grid item>
                <Grid container alignItems="center">
                  <IconButton
                    onClick={onPlayPause}
                    style={{ marginLeft: -17 }}
                    className={classes.bottomIcons}
                  >
                    {playing ? (
                      <PauseCircleOutlineTwoToneIcon fontSize="small" />
                    ) : (
                      <PlayCircleOutlineTwoToneIcon fontSize="small" />
                    )}
                  </IconButton>


                  <Button
                    variant="text"
                    onClick={
                      onChangeDispayFormat
                      //     () =>
                      //   setTimeDisplayFormat(
                      //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                      //   )
                    }
                  >
                    <Typography
                      variant="body1"
                      className="MobileTimerVideo"
                    >
                      {elapsedTime}/{totalDuration}
                    </Typography>
                  </Button>
                </Grid>

              </Grid>
              <Grid item>
                {/* <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}X</Typography>
                </Button> */}

                {/* Not Needed for the Client as speed is not needed */}
                {/* <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.75, 0.5, 1, 1.5, 2, 2.5, 2.75, 3, 3.5].map((rate) => (
                      <Button
                        key={rate}
                        //   onClick={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={rate === playbackRate ? "secondary" : "inherit"}
                        >
                          {rate}X
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover> */}
                {/* Not Needed for the Client as speed is not needed */}

                {/* This is the volume buttons */}
                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="small" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="small" />
                  ) : (
                    <VolumeDown fontSize="small" />
                  )}
                </IconButton>

                <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  // className={classes.volumeSliderMobile}
                  className={`volumeSliderMobile`}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
                {/* This is the volume buttons */}

                <IconButton
                  onClick={onToggleFullScreen}
                  className={`FullScreenMobileBtn ${classes.bottomIcons}`}
                >
                  <FullScreen fontSize="small" />
                </IconButton>
                {/* The Pciture in Picture functionality is not needed in Mobile View */}
                {/* <IconButton className={classes.bottomIcons}>
                  <div className="btn-group dropstart">
                    <span type="button" className="PipButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </span>
                    <ul className="dropdown-menu PIPDropDown">
                      <li onClick={onHandlePIP}><a className="dropdown-item" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-pip mr-3" viewBox="0 0 16 16">
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                          <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z" />
                        </svg>
                        Picture in Picture</a>
                      </li>
                    </ul>
                  </div>
                </IconButton> */}
                {/* The Pciture in Picture functionality is not needed in Mobile View */}
              </Grid>

              <Grid item xs={12}>
                <PrettoSliderMobile
                  min={0}
                  max={100}
                  ValueLabelComponent={(props) => (
                    <ValueLabelComponent {...props} value={elapsedTime} />
                  )}
                  aria-label="custom thumb label"
                  value={played * 100}
                  onChange={onSeek}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onSeekMouseUp}
                  onDuration={onDuration}
                />
              </Grid>
            </Grid>

          </Grid>
        </div>

      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
