import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faChartSimple,
  faHeart,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <button>
          <FontAwesomeIcon icon={faCircleInfo} size="2x" />
        </button>
        <button>
          <FontAwesomeIcon icon={faHeart} size="2x" />
        </button>
      </div>
      <div>Alvin heardle</div>
      <div>
        <button>
          <FontAwesomeIcon icon={faChartSimple} size="2x" />
        </button>
        <button>
          <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
        </button>
      </div>
    </div>
  );
};

export default Header;
