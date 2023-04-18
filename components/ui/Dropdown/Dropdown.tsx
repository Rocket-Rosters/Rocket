import { forwardRef, useState } from 'react';
import classnames from 'classnames';
import mergeRefs from 'react-merge-refs';
import LoadingDots from '../LoadingDots/LoadingDots';
import './Dropdown.module.css';
const Dropdown = (
  //@ts-ignore
  { className, options, onChange, selectedOption, loading, disabled },
  //@ts-ignore
  ref
) => {
  const [toggleOn, setToggleOn] = useState(false);

  const handleToggleClick = () => {
    setToggleOn(!toggleOn);
  };

  const selectedLabel = selectedOption?.label ?? options[0]?.label ?? '';

  return (
    <div
      className={classnames('toggle', className, {
        toggleOn,
        toggleOff: !toggleOn,
        disabled
      })}
      onClick={handleToggleClick}
      ref={ref}
    >
      {loading ? <LoadingDots /> : <span>{selectedLabel}</span>}
    </div>
  );
};

export default forwardRef(Dropdown);
