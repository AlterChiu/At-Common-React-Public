import React, { useImperativeHandle } from "react";
import {
  AtJSSurveyCreatorModel,
  AtJSSurveyCreatorRef,
} from "./Model/AtJSSurveyCreatorModel";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const AtJSSurveyCreator: React.ForwardRefRenderFunction<
  AtJSSurveyCreatorRef,
  AtJSSurveyCreatorModel
> = (props: AtJSSurveyCreatorModel, ref?) => {
  // 帶入預設參數
  const [creator, setCreator] = React.useState(
    Object.assign(
      {
        creator: new SurveyCreator(creatorOptions),
        content: "",
      },
      props
    )
  );

  // 移除付費標章
  React.useEffect(() => {
    creator.creator.text = creator.content;
    document.getElementsByClassName("svc-creator__banner")[0].remove();
  }, []);

  React.useEffect(() => {
    setCreator((pre) => {
      pre.creator.text = props.content;
      return pre;
    });
  }, [props.content]);

  // 對外function
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return creator.creator?.text!;
    },
  }));

  return <SurveyCreatorComponent creator={creator.creator!} />;
};
export default React.forwardRef(AtJSSurveyCreator);

// Creator預設參數
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};
