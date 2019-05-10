/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Container } from "reactstrap";
import { I18n } from "react-redux-i18n";

import TripSummary from "../../components/Summary/TripSummary";
import GoBackToPage from "../../components/GoBackToPage/GoBackToPage";

import * as P from "./style";

class PamyentSuccessPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const status = this.props.match.params.status || "error";

    return (
      <Container>
        <P.Wrapper>
          <P.Forms>
            <P.Header>{I18n.t("payment.payment")}</P.Header>
            <P.Body>
              {status === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="133.4"
                  height="133.4"
                  viewBox="0 0 133.4 133.4"
                >
                  <g
                    id="Group_586"
                    data-name="Group 586"
                    transform="translate(-8795 -6086.5)"
                  >
                    <g id="Group_585" data-name="Group 585">
                      <g
                        id="Group_582"
                        data-name="Group 582"
                        transform="translate(8795 6086.5)"
                      >
                        <path
                          id="Path_17"
                          data-name="Path 17"
                          d="M66.7,0a66.7,66.7,0,1,0,66.7,66.7A66.777,66.777,0,0,0,66.7,0Zm0,126.735A60.035,60.035,0,1,1,126.735,66.7,60.1,60.1,0,0,1,66.7,126.735Z"
                          fill="#4cc328"
                        />
                        <path
                          id="Path_18"
                          data-name="Path 18"
                          d="M200.777,182.879l-25.57,25.434-9.33-9.385a3.328,3.328,0,0,0-4.733,4.679l11.67,11.751a3.316,3.316,0,0,0,4.706,0l27.937-27.774a3.318,3.318,0,1,0-4.679-4.706Z"
                          transform="translate(-116.613 -132.419)"
                          fill="#4cc328"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="133.4"
                  height="133.4"
                  viewBox="0 0 133.4 133.4"
                >
                  <g
                    id="Group_584"
                    data-name="Group 584"
                    transform="translate(-8795 -6276)"
                  >
                    <g
                      id="Group_583"
                      data-name="Group 583"
                      transform="translate(8795 6275.5)"
                    >
                      <path
                        id="Path_17"
                        data-name="Path 17"
                        d="M66.7,0a66.7,66.7,0,1,0,66.7,66.7A66.777,66.777,0,0,0,66.7,0Zm0,126.735A60.035,60.035,0,1,1,126.735,66.7,60.1,60.1,0,0,1,66.7,126.735Z"
                        transform="translate(0 0.5)"
                        fill="#c32828"
                      />
                      <text
                        id="x"
                        transform="translate(48 87.5)"
                        fill="#c32828"
                        font-size="72"
                        font-family="HiraMaruProN-W4, Hiragino Maru Gothic ProN"
                      >
                        <tspan x="0" y="0">
                          x
                        </tspan>
                      </text>
                    </g>
                  </g>
                </svg>
              )}
              <P.Message>{I18n.t(`payment-${status}.message`)}</P.Message>
              <P.Details>{I18n.t(`payment-${status}.details`)}</P.Details>
            </P.Body>
          </P.Forms>
        </P.Wrapper>
        <GoBackToPage finalStep={true} />
      </Container>
    );
  }
}

export default PamyentSuccessPage;
