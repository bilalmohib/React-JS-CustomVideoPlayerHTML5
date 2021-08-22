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
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },
  bottomIconsMobile: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
    marginLeft:150
  },
  volumeSlider: {
    width: 100,
  },
  volumeSliderMobile: {
    width: 50,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const PrettoSliderMobile = withStyles({
  root: {
    height: 8,
    marginTop:-5,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
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
              {/* <Grid item>
              <Button
                onClick={onBookmark}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid> */}
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center">
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
            </Grid>
            {/* bottom controls */}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: 16 }}
            >
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

              <Grid item>
                <Grid container alignItems="center">
                  <IconButton
                    onClick={onPlayPause}
                    className={classes.bottomIcons}
                  >
                    {playing ? (
                      <PauseIcon fontSize="large" />
                    ) : (
                      <PlayArrowIcon fontSize="large" />
                    )}
                  </IconButton>

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
                    className={classes.volumeSlider}
                    onMouseDown={onSeekMouseDown}
                    onChangeCommitted={onVolumeSeekDown}
                  />
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
                <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}X</Typography>
                </Button>

                <Popover
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
                </Popover>
                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.bottomIcons}
                >
                  <FullScreen fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={onHandlePIP}
                  className={classes.bottomIcons}
                >
                  <PictureInPictureAltTwoToneIcon fontSize="large" />
                </IconButton>
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
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              style={{ padding: 16 }}
            >
              <Grid item>
                {/* <Typography variant="h5" style={{ color: "#fff" }}>
                  Mobile View
                </Typography> */}
              </Grid>
              {/* <Grid item>
              <Button
                onClick={onBookmark}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid> */}
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center">
              <IconButton
                onClick={onRewind}
                className={classes.controlIcons}
                aria-label="rewind"
              >
                {/* ////////////////// */}
                <FastRewindIcon
                  fontSize="small"
                />
              </IconButton>
              <IconButton
                onClick={onPlayPause}
                className={classes.controlIcons}
                aria-label="play"
              >
                {playing ? (
                  <PauseIcon fontSize="small" />
                ) : (
                  <PlayArrowIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                onClick={onFastForward}
                className={classes.controlIcons}
                aria-label="forward"
              >
                <FastForwardIcon fontSize="small" />
              </IconButton>
            </Grid>
            {/* bottom controls */}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: 10 }}
            >
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

              <Grid container
                direction="row"
                justify="space-between"
                alignItems="center"
                >
                <Grid container className="MobileControlsDaikh" alignItems="center">
                  <IconButton
                    onClick={onPlayPause}
                    className={classes.bottomIcons}
                  >
                    {playing ? (
                      <PauseIcon fontSize="small" />
                    ) : (
                      <PlayArrowIcon fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    // onClick={() => setState({ ...state, muted: !state.muted })}
                    onClick={onMute}
                    className={`volumeMobile ${classes.bottomIcons} ${classes.volumeButton}`}
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
                    className={`${classes.volumeSliderMobile}`}
                    // className="volumeSlider"
                    onMouseDown={onSeekMouseDown}
                    onChangeCommitted={onVolumeSeekDown}
                  />
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
                      style={{ color: "#fff", marginLeft: "8px", fontSize: "15px" }}
                    >
                      {elapsedTime}/{totalDuration}
                    </Typography>
                  </Button>

                  {/* This is second grid although it should come up here */}
                  <Button
                    onClick={handleClick}
                    aria-describedby={id}
                    className={`bottomIconsMobile ${classes.bottomIcons}`}
                    variant="text"
                  >
                    <Typography>{playbackRate}X</Typography>
                  </Button>

                  <Popover
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
                  </Popover>
                  <IconButton
                    onClick={onToggleFullScreen}
                    className={`bottomIconsMobile ${classes.bottomIcons}`}
                  >
                    <FullScreen fontSize="normal" />
                  </IconButton>
                  {/* <IconButton
                    onClick={onHandlePIP}
                    className={classes.bottomIcons}
                  >
                    <PictureInPictureAltTwoToneIcon fontSize="large" />
                  </IconButton> */}
                  {/* This is second grid although it should come up here */}
                </Grid>
              </Grid>

              <Grid item>

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
