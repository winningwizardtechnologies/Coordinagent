import { Icon, Persona, PersonaSize } from '@fluentui/react';
import React from 'react';
import { colors } from '../../Constants/colors';
import { errorStyle } from '../../Constants/constants';
import { getInitials } from '../../Utility/contactUtil';

export const ImagePersona: React.FC<{
  text: string;
  secondaryText: string;
  imageInitials?: string;
  size: PersonaSize;
  initialsColor: string;
  image?: string;
  styles?: {
    primaryText?: Record<string, string>;
    secondaryText?: Record<string, string>;
    details?: Record<string, string>;
  };
}> = (props) => {
  const [coinHovered, setCoinHovered] = React.useState(false);
  const [fileError, setFileError] = React.useState('Max File Size: 10 MB');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    setFileError('');
    if (hiddenFileInput?.current?.value) {
      hiddenFileInput.current.value = '';
    }
  }, [props]);
  return (
    <>
      <Persona
        initialsColor={props.initialsColor}
        size={props.size}
        text={props.text}
        imageAlt={props.text}
        secondaryText={props.secondaryText}
        onRenderInitials={() => {
          if (props.image) {
            // show image via url
            return <span></span>;
          } else {
            const split = props.text?.split(' ');
            const initials =
              props.imageInitials || getInitials(split?.[0], split?.[1]);
            return coinHovered ? (
              <Icon iconName='EditPhoto' />
            ) : (
              <span>{initials}</span>
            );
          }
        }}
        styles={{
          primaryText: props.styles?.primaryText,
          secondaryText: props.styles?.secondaryText,
          details: props.styles?.details
        }}
        coinProps={{
          onMouseEnter: () => {
            setCoinHovered(true);
          },
          onMouseLeave: () => {
            setCoinHovered(false);
          },
          styles: {
            coin: {
              filter: `brightness(${coinHovered ? '0.75' : '1'})`,
              cursor: `${coinHovered ? 'pointer' : 'default'}`
            }
          },
          onClick: () => {
            hiddenFileInput.current?.click();
          }
        }}
      />
      {fileError && <div style={errorStyle}>{fileError}</div>}
      <input
        type='file'
        style={{ display: 'none' }}
        ref={hiddenFileInput}
        accept='image/*,image/heic'
        onChange={(ev) => {
          const newFile = ev?.target?.files?.[0];
          if (newFile) {
            if (newFile.size > 10485760) {
              setFileError('Max File Size: 10 MB');
            } else {
              setImageFile(newFile);
              setFileError('');
            }
          } else {
            setFileError('Image upload failed');
          }
        }}
      />
    </>
  );
};
