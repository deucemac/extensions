import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBindReact from 'auto-bind/react';
import { reduxForm } from 'redux-form';
import {
  Row,
  Button,
  ControlLabel,
  FormGroup,
  ButtonToolbar,
  HelpBlock,
} from 'react-bootstrap';
import {
  LoaderContainer,
  ReduxFormElement,
  ImageUploader,
  Switch,
} from '@shoutem/react-web-ui';
import { getFormState } from 'src/redux';
import ext from 'src/const';
import { validateGroup } from '../../services';
import './style.scss';

class GroupForm extends Component {
  constructor(props) {
    super(props);
    autoBindReact(this);
  }

  handleImageUploadSuccess(url) {
    const {
      fields: { imageUrl },
      touch,
    } = this.props;

    imageUrl.onChange(url);
    touch(['imageUrl']);
  }

  handleImageDeleteSuccess() {
    const {
      fields: { imageUrl },
      touch,
    } = this.props;
    imageUrl.onChange('');
    touch(['imageUrl']);
  }

  resolveFilename(file) {
    const timestamp = new Date().getTime();
    const fileName = file.name ? `${timestamp}-${file.name}` : `${timestamp}`;

    return fileName;
  }

  render() {
    const {
      assetManager,
      submitting,
      invalid,
      fields: { id, name, imageUrl, subscribeByDefault },
      onCancel,
      handleSubmit,
      error,
    } = this.props;

    const inEditMode = !!id.value;
    const isImageError = imageUrl.touched && imageUrl.error;

    return (
      <form className="group-form" onSubmit={handleSubmit}>
        <Row>
          <ReduxFormElement
            elementId="name"
            name="Name"
            maxLength={255}
            disabled={submitting}
            field={name}
          />
        </Row>
        <Row>
          <FormGroup
            controlId="imageUrl"
            validationState={isImageError ? 'error' : 'success'}
          >
            <ControlLabel>Image</ControlLabel>
            <ImageUploader
              onUploadSuccess={this.handleImageUploadSuccess}
              onDeleteSuccess={this.handleImageDeleteSuccess}
              resolveFilename={this.resolveFilename}
              src={imageUrl.value}
              elementId="imageUrl"
              helpText="120x120px"
              previewSize="custom"
              width={120}
              height={120}
              folderName={ext()}
              assetManager={assetManager}
              disabled={submitting}
              preview={imageUrl.value}
              field={imageUrl}
            />
            <div className="has-error image-error">
              {isImageError && <HelpBlock>{imageUrl.error}</HelpBlock>}
            </div>
          </FormGroup>
        </Row>
        <Row className="switch">
          <ReduxFormElement
            disabled={submitting}
            elementId="subscribeByDefault"
            field={subscribeByDefault}
            name="Subscribe by default"
          >
            <Switch />
          </ReduxFormElement>
        </Row>
        <ButtonToolbar>
          <Button
            bsSize="large"
            bsStyle="primary"
            disabled={submitting || invalid}
            type="submit"
          >
            <LoaderContainer isLoading={submitting}>
              {inEditMode ? 'Save' : 'Add'}
            </LoaderContainer>
          </Button>
          <Button bsSize="large" disabled={submitting} onClick={onCancel}>
            Cancel
          </Button>
        </ButtonToolbar>
        {error && (
          <div className="has-error">
            <HelpBlock>{error}</HelpBlock>
          </div>
        )}
      </form>
    );
  }
}

GroupForm.propTypes = {
  assetManager: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  fields: PropTypes.object,
  onCancel: PropTypes.func,
  touch: PropTypes.func,
  error: PropTypes.string,
};

export default reduxForm({
  getFormState,
  form: 'groupForm',
  fields: ['id', 'name', 'imageUrl', 'subscribeByDefault'],
  validate: validateGroup,
})(GroupForm);
