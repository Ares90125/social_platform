import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { AddPhotoAlternate, RemoveCircle } from '@mui/icons-material';
import { ErrorPopup } from './ErrorPopup';

type UploadFilesProps = {
  imageFiles: (File | string)[];
  videoFiles: (File | string)[];
  handleGallery: (photoIndex: number) => void;
  previewImage: { src: string; type: string }[];
  handleImageFiles: (image: (File | string)[]) => void;
  handleVideoFiles: (video: (File | string)[]) => void;
  handlePreviews: (preview: { src: string; type: string }[]) => void;
};

export const UploadFiles: React.FC<UploadFilesProps> = ({
  imageFiles,
  videoFiles,
  previewImage,
  handleGallery,
  handlePreviews,
  handleImageFiles,
  handleVideoFiles,
}) => {
  const [error, setError] = useState({
    isOpen: false,
    heading: '',
    content: '',
  });

  const removeError = (): void => {
    setError({
      isOpen: false,
      heading: '',
      content: '',
    });
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }

    const { type, size } = file;
    const isNotAllowedMediaType =
      type.match(/image\/*/) === null && type.match(/video\/*/) === null;
    const isAllowedImageType =
      type.split('/')[0] === 'image' && type !== 'image/gif';
    const isVideoType = type.split('/')[0] === 'video';
    const isCombinationOfImageAndVideo =
      (isAllowedImageType && videoFiles.length > 0) ||
      (imageFiles.length > 0 && isVideoType);
    const isVideoAlreadyAdded = videoFiles.length > 0;

    if (
      isNotAllowedMediaType ||
      (!isNotAllowedMediaType && isCombinationOfImageAndVideo) ||
      (!isNotAllowedMediaType && isVideoType && isVideoAlreadyAdded)
    ) {
      const alert: {
        content: string;
        heading: string;
      } = { content: '', heading: '' };

      switch (true) {
        case isNotAllowedMediaType:
          alert.heading = 'Incorrect file format';
          alert.content =
            'Only files with the following extention are allowed: gif, png, jpg, jpeg, mp4, avi, mov';
          break;
        case isCombinationOfImageAndVideo:
          alert.heading = `Can not upload ${
            isAllowedImageType ? 'Image' : 'Video'
          }`;
          alert.content =
            'Videos and images cannot exist together in the same post.';
          break;
        case isVideoAlreadyAdded:
          alert.content = 'Remove existing video to upload a new one.';
          alert.heading = 'Only one video is allowed per post';
          break;
        default:
          break;
      }
      setError({
        ...alert,
        isOpen: true,
      });
      return;
    }

    if (type.split('/')[0] === 'image' && type !== 'image/gif') {
      if (size <= 4000000) {
        handleImageFiles([...imageFiles, file]);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (): void => {
          if (typeof reader.result === 'string') {
            handlePreviews([
              ...previewImage,
              { src: reader.result, type: 'image' },
            ]);
          }
        };
      } else {
        setError({
          heading: 'Image size too large',
          content:
            'That file is too large to be uploaded. The limit is 4 MB for image.',
          isOpen: true,
        });
      }
    } else {
      if (size > 204800000) {
        setError({
          heading: 'Video size too large',
          content:
            'That file is too large to be uploaded. The limit is 200 MB for video.',
          isOpen: true,
        });
        return;
      }

      handleVideoFiles([...videoFiles, file]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (): void => {
        if (typeof reader.result === 'string') {
          handlePreviews([
            ...previewImage,
            { src: reader.result, type: 'video' },
          ]);
        }
      };
    }
  };

  const removePreview = (i: number, type: string): void => {
    const updatedPreview = [...previewImage];
    updatedPreview.splice(i, 1);
    handlePreviews(updatedPreview);

    if (type === 'image') {
      const updatedImageFiles = [...imageFiles];
      updatedImageFiles.splice(i, 1);
      handleImageFiles(updatedImageFiles);

      return;
    }

    const updatedVideoFiles = [...videoFiles];
    updatedVideoFiles.splice(i, 1);
    handleVideoFiles(updatedVideoFiles);
  };

  return (
    <>
      <Box>
        {!previewImage.length ? (
          <>
            <IconButton>
              <label htmlFor="uploadFileTask" style={{ cursor: 'pointer' }}>
                <AddPhotoAlternate />
              </label>
            </IconButton>

            <input
              onChange={handleUploadFile}
              accept=".gif,.jpg,.jpeg,.png,.bmp,.tiff,.mp4,.avi,.mov,.mpg,.mpeg,.wmv,.flv"
              id="uploadFileTask"
              type="file"
              style={{ display: 'none' }}
            />
          </>
        ) : (
          <Box
            component="ul"
            sx={{
              display: 'flex',
              listStyleType: 'none',
              m: 0,
              p: 0,
            }}
          >
            {previewImage.map((file, index) => {
              if (file.type === 'image') {
                return (
                  <Box
                    key={file.src}
                    component="li"
                    sx={{
                      width: '56px',
                      height: '56px',
                      position: 'relative',
                      mr: '16px',
                    }}
                  >
                    <img
                      src={file.src}
                      alt={`file ${index + 1}`}
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '6px',
                        border: '1px solid #ececec',
                        cursor: 'pointer',
                      }}
                      onClick={(): void => handleGallery(index)}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        transform: 'translate(40%, -40%)',
                      }}
                      onClick={(): void => removePreview(index, 'image')}
                    >
                      <RemoveCircle fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                );
              }

              if (file.type === 'video') {
                return (
                  <Box
                    key={file.src}
                    component="li"
                    sx={{
                      width: '56px',
                      height: '56px',
                      position: 'relative',
                      mr: '16px',
                    }}
                  >
                    <video
                      controls={false}
                      height="56"
                      width="56"
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #ececec',
                        cursor: 'pointer',
                      }}
                      onClick={(): void => handleGallery(index)}
                    >
                      <track kind="captions" />
                      <source src={file.src} />
                    </video>
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        transform: 'translate(40%, -40%)',
                      }}
                      onClick={(): void => removePreview(index, 'video')}
                    >
                      <RemoveCircle fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                );
              }

              return null;
            })}
            {previewImage.length < 6 && (
              <Box
                component="li"
                sx={{
                  width: '56px',
                  height: '56px',
                  position: 'relative',
                  mr: '16px',
                }}
              >
                <label
                  htmlFor="uploadFileTask"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: '#f7f7f8',
                    border: '1px dashed #adadb9',
                    borderRadius: '3px',
                    position: 'relative',
                    overflow: 'hidden',
                    color: '#9999a7',
                    width: '56px',
                    height: '56px',
                    fontSize: '27px',
                    fontWeight: 300,
                  }}
                >
                  +
                </label>

                <input
                  onChange={handleUploadFile}
                  accept=".gif,.jpg,.jpeg,.png,.bmp,.tiff,.mp4,.avi,.mov,.mpg,.mpeg,.wmv,.flv"
                  id="uploadFileTask"
                  type="file"
                  style={{ display: 'none' }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <ErrorPopup {...error} closeModal={removeError} />
    </>
  );
};
