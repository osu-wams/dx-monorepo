import React, { useEffect, useState, useContext } from 'react';
import { useRecoilValue, RecoilState } from 'recoil';
import VisuallyHidden from '@reach/visually-hidden';
import styled, { ThemeContext } from 'styled-components/macro';
import { fontSize } from 'src/theme';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { InfoButtons } from '@osu-wams/hooks';
import Icon from 'src/ui/Icon';
import { MyDialog } from 'src/ui/MyDialog';
import { Button, CloseButton } from 'src/ui/Button';

export interface InfoButtonProps {
  infoButtonId: string;
  state: RecoilState<InfoButtons.InfoButtonState[]>;
  gaEvent: (event: string, title: string) => void;
}

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const DialogClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const DialogTitle = styled.h2`
  flex-grow: 2;
  font-size: ${fontSize['20']};
`;

const DialogContent = styled.div`
  font-size: ${fontSize['14']};
`;

const InfoButton = (props: InfoButtonProps) => {
  const themeContext = useContext(ThemeContext);
  const infoButtonData = useRecoilValue(props.state);
  const [dialogVisible, toggleDialog] = useState(false);
  const [currentButton, setButton] = useState<InfoButtons.InfoButtonState | null>(null);

  useEffect(() => {
    if (Array.isArray(infoButtonData)) {
      const thisButton = infoButtonData.find(i => i.id === props.infoButtonId);
      if (thisButton) {
        setButton(thisButton);
      }
    }
  }, [infoButtonData, props.infoButtonId]);

  return currentButton ? (
    <>
      <Button
        bg={themeContext.ui.button.info.background}
        data-testid={props.infoButtonId}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          toggleDialog(true);
          props.gaEvent('info-button', currentButton.title);
        }}
      >
        <Icon icon={faInfoCircle} size="lg" color={themeContext.ui.button.info.icon.color} />
        <VisuallyHidden>Information about {currentButton.title}</VisuallyHidden>
      </Button>
      <MyDialog isOpen={dialogVisible} aria-labelledby="infobtn-title" onDismiss={() => toggleDialog(false)}>
        <DialogHeader>
          <DialogTitle id="infobtn-title">{currentButton.title}</DialogTitle>
          <DialogClose onClick={(e: React.MouseEvent<HTMLElement>) => toggleDialog(false)} />
        </DialogHeader>
        <DialogContent dangerouslySetInnerHTML={{ __html: currentButton.content }} />
      </MyDialog>
    </>
  ) : null;
};

export default InfoButton;
