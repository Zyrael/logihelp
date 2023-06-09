import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeSheetSlice";
import { ReactComponent as RemoveIcon } from "../../../assets/icons/cross.svg";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name } = route;
  const dispatch = useDispatch();

  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const nodeRef = useRef(null);

  const duration = 200;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const handleRemoveRoute = () => {
    setInProp(false);
    setTimeout(() => dispatch(removeRoute(route)), duration);
  };

  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {(state) => (
        <li
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          className="route-element"
        >
          <p>{name}</p>
          <button
            type="button"
            className="remove-btn"
            onClick={handleRemoveRoute}
          >
            <RemoveIcon className="remove-icon" />
          </button>
        </li>
      )}
    </Transition>
  );
}
