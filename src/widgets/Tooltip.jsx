import { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

function Tooltip(props) {
  const { api, content: Content, children } = props;

  const areaRef = useRef(null);
  const tooltipNodeRef = useRef(null);

  const [areaCoords, setAreaCoords] = useState({});
  const [tooltipData, setTooltipData] = useState(null);
  const [pos, setPos] = useState({});
  const [isTouch, setIsTouch] = useState(false);

  // Track whether the mouse is over the tooltip itself
  const overTooltipRef = useRef(false);
  const dismissTimerRef = useRef(null);

  function findAttribute(node) {
    while (node) {
      if (node.getAttribute) {
        const id = node.getAttribute('data-tooltip-id');
        const at = node.getAttribute('data-tooltip-at');
        const tooltip = node.getAttribute('data-tooltip');
        if (id || tooltip) return { id, tooltip, target: node, at };
      }
      node = node.parentNode;
    }

    return { id: null, tooltip: null, target: null, at: null };
  }

  useEffect(() => {
    const tooltipNode = tooltipNodeRef.current;
    // Skip boundary clamping for touch tooltips (they use CSS transform centering)
    if (isTouch) return;
    if (tooltipNode && pos && (pos.text || Content)) {
      const tooltipCoords = tooltipNode.getBoundingClientRect();

      let updated = false;
      let newLeft = pos.left;
      let newTop = pos.top;

      if (tooltipCoords.right >= areaCoords.right) {
        newLeft = areaCoords.width - tooltipCoords.width - 5;
        updated = true;
      }
      if (tooltipCoords.bottom >= areaCoords.bottom) {
        newTop = pos.top - (tooltipCoords.bottom - areaCoords.bottom + 2);
        updated = true;
      }

      if (updated) {
        setPos((prev) => {
          if (!prev) return prev;
          return { ...prev, left: newLeft, top: newTop };
        });
      }
    }
  }, [pos, areaCoords, Content, isTouch]);

  const timerRef = useRef(null);
  const activeIdRef = useRef(null);
  const TIMEOUT = 300;
  const DISMISS_DELAY = 150;

  const debounce = (code) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      code();
    }, TIMEOUT);
  };

  function dismiss() {
    clearTimeout(timerRef.current);
    activeIdRef.current = null;
    setPos(null);
    setTooltipData(null);
    setIsTouch(false);
  }

  // Delayed dismiss — gives the user time to move from bar → tooltip
  function scheduleDismiss() {
    clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => {
      if (!overTooltipRef.current) {
        dismiss();
      }
    }, DISMISS_DELAY);
  }

  function cancelDismiss() {
    clearTimeout(dismissTimerRef.current);
  }

  function move(e) {
    let { id, tooltip, target, at } = findAttribute(e.target);

    // Left the bar area — schedule dismiss (user may be moving to tooltip)
    if (!id && !tooltip) {
      clearTimeout(timerRef.current);
      if (!overTooltipRef.current) {
        scheduleDismiss();
      }
      return;
    }

    // Hovering a bar — cancel any pending dismiss
    cancelDismiss();

    if (!tooltip) {
      tooltip = getTaskText(id);
    }

    // Still hovering the same bar — keep tooltip visible, just update cursor X
    if (activeIdRef.current === id && pos) {
      const areaEl = areaRef.current;
      const areaRect = areaEl
        ? areaEl.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      if (at !== 'left') {
        setPos((prev) => (prev ? { ...prev, left: e.clientX - areaRect.left } : prev));
      }
      return;
    }

    // Switched to a different bar — reset and debounce
    activeIdRef.current = id;
    setPos(null);
    setTooltipData(null);
    setIsTouch(false);

    const clientX = e.clientX;

    debounce(() => {
      if (id) {
        setTooltipData(getTaskObj(prepareId(id)));
      }

      const targetCoords = target.getBoundingClientRect();
      const areaEl = areaRef.current;
      const areaRect = areaEl
        ? areaEl.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

      let top, left;
      if (at === 'left') {
        top = targetCoords.top + 5 - areaRect.top;
        left = targetCoords.right + 5 - areaRect.left;
      } else {
        top = targetCoords.top + targetCoords.height - areaRect.top;
        left = clientX - areaRect.left;
      }

      setAreaCoords(areaRect);
      setPos({ top, left, text: tooltip });
    });
  }

  // Tooltip mouse enter/leave — keep tooltip alive while hovering it
  function onTooltipMouseEnter() {
    overTooltipRef.current = true;
    cancelDismiss();
  }

  function onTooltipMouseLeave() {
    overTooltipRef.current = false;
    scheduleDismiss();
  }

  function touchStart(e) {
    const touch = e.touches[0];
    if (!touch) return;
    const { id, target } = findAttribute(e.target);
    if (!id) return;

    // Show immediately — no debounce for touch
    clearTimeout(timerRef.current);
    const taskData = getTaskObj(prepareId(id));
    const tooltip = taskData?.text || '';

    const targetCoords = target.getBoundingClientRect();
    const areaEl = areaRef.current;
    const areaRect = areaEl
      ? areaEl.getBoundingClientRect()
      : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

    setTooltipData(taskData);
    setAreaCoords(areaRect);
    setIsTouch(true);
    // Position above the bar, centered on touch X
    setPos({
      top: targetCoords.top - areaRect.top - 8,
      left: touch.clientX - areaRect.left,
      text: tooltip,
    });
  }

  function touchDismiss() {
    setPos(null);
    setTooltipData(null);
    setIsTouch(false);
  }

  function getTaskObj(id) {
    return api?.getTask(prepareId(id)) || null;
  }

  function getTaskText(id) {
    return getTaskObj(id)?.text || '';
  }

  function prepareId(id) {
    const numId = Number(id);
    return Number.isFinite(numId) ? numId : id;
  }

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(dismissTimerRef.current);
    };
  }, []);

  const tooltipClass = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    isTouch ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className="wx-KG0Lwsqo wx-tooltip-area"
      ref={areaRef}
      onMouseMove={move}
      onTouchStart={touchStart}
      onTouchEnd={touchDismiss}
      onTouchMove={touchDismiss}
    >
      {pos && (pos.text || Content) ? (
        <div
          className={tooltipClass}
          ref={tooltipNodeRef}
          style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
          onMouseEnter={onTooltipMouseEnter}
          onMouseLeave={onTooltipMouseLeave}
        >
          {Content ? (
            <Content data={tooltipData} />
          ) : pos.text ? (
            <div className="wx-KG0Lwsqo wx-gantt-tooltip-text">{pos.text}</div>
          ) : null}
        </div>
      ) : null}

      {children}
    </div>
  );
}

export default Tooltip;
