import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SlideCaptcha, { displayTypeMap } from 'react-slide-captcha';
import { randomCaptchaImg } from './imgs';
import 'react-slide-captcha/dist/styles.css';
import './style/index.css';

const SliderVerification = (props) => {
  const { tipsText, mode, onChecked, ctrl } = props;
  const slideCaptcha = useRef();
  const [captchaInfo, setCaptchaInfo] = useState(randomCaptchaImg());
  const [validateResult, setValidateResult] = useState(false);

  const validateCaptcha = useCallback((validateValue, validatedSuccess, validatedFail, resetCaptcha) => {
    let matched;
    console.log(validateValue);
    if (validateValue) {
      matched = validateValue > captchaInfo.percent[0] && validateValue < captchaInfo.percent[1];
      if (matched) {
        validatedSuccess(() => {
          setValidateResult(true);
          if (typeof onChecked === 'function') {
            onChecked();
          }
          return true;
        });
      } else {
        validatedFail(() => {
          setValidateResult(false);
          resetCaptcha();
        });
      }
    }
  });

  const validateReset = useCallback(() => {
    if (!validateResult) {
      setCaptchaInfo(randomCaptchaImg());
    }
  });
  /*
  useEffect(() => {
    if (typeof ctrl === 'function') {
      let fobject = {
        reset: () => {
          setCaptchaInfo(randomCaptchaImg());
        },
      };
      ctrl(fobject);
    }
  }, [ctrl]);
  */

  let className = '';
  if (validateResult) {
    className += 'xt-slider-success ';
  }
  if (mode === 'static') {
    className += 'xt-slider-static';
  }

  return (
    <SlideCaptcha
      ref={slideCaptcha}
      containerClassName={className}
      tipsText={tipsText || '拖动滑块，完成拼图时松开就可通过验证'}
      puzzleUrl={captchaInfo.block}
      bgUrl={captchaInfo.background}
      slidedImageSuccess="√"
      // tipsStyle={{ fontSize: 14 }}
      // imagePosition="top"
      resetButton="inline "
      reset="manual "
      onRequest={validateCaptcha}
      onReset={validateReset}
    />
  );
};

SliderVerification.propTypes = {
  mode: PropTypes.string,
  onChecked: PropTypes.func,
  tipsText: PropTypes.string,
  ctrl: PropTypes.func,
};

export default SliderVerification;
