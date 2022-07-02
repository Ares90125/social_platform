/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Grid,Drawer, IconButton,Switch,Button, Select, MenuItem, InputLabel,FormControl,RadioGroup,FormLabel,FormControlLabel,Radio,TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import clsx from 'clsx';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { getScreenshotUploadData } from '../../../../../../graphs/getScreenshotUploadData';
import { useMutation, useQuery } from 'react-query';
import { createStyles,makeStyles } from '@mui/styles';
import { listCampaignGroupsAndTasksDetails } from '../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import {uploadToS3 } from '../../../../../../utils/helpers/s3';
import { v4 as uuid } from 'uuid';
import {createScreenshotUploadData}  from '../../../../../../graphs/createScreenshotUploadData';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type ReportingDrawerProp = {
  handleClick: Function,
  value:any,
  campaign:any,
  // campaignReportS3Data: CMCReportv3S3Data | null,
  open:boolean
};

const ReportingDrawer: React.FC<ReportingDrawerProp> = ({
  campaign,
  open,
  handleClick,
  value,
  // campaignReportS3Data,
}) => {
  const useStyles = makeStyles(theme =>
    createStyles({
      formControlLabel: { fontSize: "15px", "& label": { fontSize: "0.6rem" } },
      smallRadioButton: {
        "& svg": {
          width: "0.7em",
          height: "0.7em"
        }
      }
    })
  );
  const createScreenshotUploadDataMutation = useMutation(createScreenshotUploadData);
  const onSave= async()=>{
    const processedFileURLs=await Promise.all([processFilesForUrls(image)]);
    console.log('ddddaaaa',processedFileURLs);
    try{
    createScreenshotUploadDataMutation
          .mutateAsync({
            input:{
              campaignId: `${campaignId}`,
              fbPermLink:fbPermlink,
              groupName: groupName,
              key: `${campaignId}_${value['title']}_${category()}_${value['name']}`,
              order: order+1,
              s3Key: `${processedFileURLs[0]}`,
              sectionName: `${value['title']}_${category()}_${value['name']}`,
              type: comment
            }
          }).then((response)=>{
            setUpload(false);
          });
        }
        catch(e){
          console.log('error');
        }
  }
  
  const processFilesForUrls = async (file) =>
    Promise.all([uploadToS3(file, 'image', uuid())]);
  const [groupName, setGroupName] = useState<any | null>(null);
  const [comment,setcomment]=useState('');
  const [order,setOrder]=useState(0);
  const [enable,setEnable]=useState(false);
  const [imageurl,setImageurl]=useState<any | null>("");
  const [image, setImage] = useState<any | null>(null);
  const [fbPermlink, setFbPermlink] = useState<string | null>(null);
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
      if(event.target.files?.length!=0){
          setImage(event.target.files![0]);
          setImageurl(URL.createObjectURL(event.target.files![0]));
      }
  };
  const [upload, setUpload]=useState(false);
  const {query:{campaignId}} = useRouter();
  const {query:{id}} = useRouter();
  const { data: List } = useQuery('list', () => listCampaignGroupsAndTasksDetails(
     `${campaignId?.toString()}`,
    `${id?.toString()}`
  ));
  const { data: keywords } = useQuery('keywords', () => getScreenshotUploadData(`${campaignId}_${value['title']}_${category()}_${value['name']}`, 100),{});
  useEffect(() => {
    if(imageurl&&comment){
      console.log(comment);
      setEnable(true);
    }
    else{
      setEnable(false);
    }
  }, [imageurl,comment]);
  const category=()=>{
    if(value['title']=="Engagement Insights"){
      return value['category'].toLowerCase();
    }
    if(value['title']=='Brand Sentiment')
    {
       switch(value['category']){
         case "Pre-Campaign": return 'preSOV';
         case "During-Campaign": return 'duringSOV';
         case "Post-Campaign": return 'afterSOV';
       }
    }
    return value['category'];
  }
  const classes = useStyles();
  // const list = keywords?.filter((brand) => brand );
  return (
       !value?<></>:
       <Drawer  open={open} anchor="right">
        {!upload?
        <Grid className={styles.screen_upload}>
          <Grid className={styles.Report_drawer_title}>
            <Grid className={styles.Reporting_title}>
              REFERENCE CONVERSATIONS
            </Grid>
              <Grid onClick={()=>{handleClick()}}>
                <IconButton aria-label="delete" color="default" >
                  <ClearIcon style={{fontSize:'16px', color:"black"}}/>
                </IconButton>
              </Grid>
          </Grid>
          <Grid className={styles.drawer_compagin}>
            <Grid >
              <Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-center"
                    alignItems="flex-center"
                  >
                    <Grid item className={styles.campaign}>
                      {value['name']+"-"+value['percent']}
                    </Grid>
                    <Grid
                      item
                      className={styles.drawer_edit}
                    >
                      Edit
                    </Grid>
                    <Grid
                      className={styles.drawer_icon}
                      item
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.Reporting_title}>
                {value['title']+" | "+value['category']}
                </Grid>
              </Grid>
            </Grid>
            <Switch
              defaultChecked
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
          </Grid>
          <Grid item className={styles.Reporting_divider} />
          <Grid className={styles.Report_drawer}>
            {
              keywords?.items?.map((element,index)=>{
              if(element?.order&&order<element?.order){
                setOrder(element?.order);
              }
              return (<Grid key={index} className={styles.drawer_map}>
                <Grid className={styles.campaign_map}>
                {`${element?.groupName}`}
                </Grid>
                <Grid className={styles.Reporting_title}>
                  {`${element?.type} | ${element?.updatedAtUTC}`}
                </Grid>
                <Grid className={styles.drawer_image}>
                  <img  src={element?.s3Key}></img>
                </Grid>
                <Grid item className={styles.Reporting_divider_map} />
              </Grid>);})
            }
          </Grid>
          <Grid className={styles.drawer_button}>
            <Grid item className={styles.Reporting_divider} />
            <Button variant="outlined" disableElevation className={styles.drawer_button_inside} onClick={()=>{setUpload(true)}}>
              Upload ScreenShot
            </Button>
          </Grid>
        </Grid>
        :
        <Grid className={styles.screen_upload}>
          <Grid className={styles.Report_upload_title}>
              <Grid onClick={()=>{setUpload(false)}}>
                <IconButton aria-label="delete" color="default" >
                  <ArrowBackIcon style={{fontSize:'18px', color:"black"}}/>
                </IconButton>
              </Grid>
              <Grid className={styles.campaign_map}>
                Upload Screenshot
              </Grid>
          </Grid>
          <Grid item className={styles.Reporting_divider} />
          <Grid className={styles.Reporting_title_upload}>Group Name</Grid>
          <FormControl fullWidth>
            <Select
              fullWidth
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right"
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={groupName}
              size="small"
              onChange={(event)=>{setGroupName(event.target.value);}}
            >
              {List?.map((element,index)=>
                <MenuItem key={index} style={{width:'300px'}} value={element['groupName']?.toString()}>{element['groupName']}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"  className={styles.Reporting_title_upload}>Comment/Post</FormLabel>
            <RadioGroup
              onChange={(event)=>{setcomment((event.target as HTMLInputElement).value);}}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel className={classes.smallRadioButton}  value="Comment" control={<Radio size="small" />} label={
                <Typography className={classes.formControlLabel}>Comment</Typography>
              } />
              <FormControlLabel className={classes.smallRadioButton}  value="Post" control={<Radio size="small" />} label={
                <Typography className={classes.formControlLabel}>Post</Typography>
              } />
            </RadioGroup>
          </FormControl>
          <Grid className={styles.Reporting_title_upload}>Screenshot</Grid>
          <label  htmlFor="image_upload">
            {
                (imageurl!="")?
                <Grid className={styles.drawer_fileUpload}>
                  <img src={imageurl} alt="" className={styles.drawer_images}/>
                </Grid>:
                <Grid className={styles.drawer_fileUpload}>
                    <Grid className={styles.Report_static_img}>
                      <DriveFolderUploadIcon/>
                      <Grid className={styles.Reporting_title_upload}>Uploaded Post Media</Grid>
                    </Grid>
                </Grid>
            }
            <Grid>
              <input type="file" style={{opacity:0,width:0}} id="image_upload" accept=".gif,.jpg,.jpeg,.png" onChange={(e) => {handleSetImage(e);}}/>
            </Grid>
          </label>
          <Grid className={styles.Reporting_title_upload}>Post/Comment fbPermLink</Grid>
          <TextField id="margin-none" size="small" placeholder="Add the fbPermLink for the post/comment" onChange={(event)=>{setFbPermlink(event.target.value)}} variant="outlined" className={styles.inputtext}/>
          <Grid className={styles.drawer_button}>
            <Grid item className={styles.Reporting_divider} />
            <Button variant="outlined" disableElevation className={styles.drawer_button_save} onClick={()=>{}}>
              cancel
            </Button>
            {!enable?
            <Button variant="contained" color="primary" disableElevation disabled className={styles.drawer_button_save} onClick={()=>{}}>
              save
            </Button>:
            <Button variant="contained" color="primary" disableElevation className={styles.drawer_button_save} onClick={()=>{onSave();}}>
              save
            </Button>}
          </Grid>
        </Grid>}
      </Drawer>
  );
}

export default ReportingDrawer;
