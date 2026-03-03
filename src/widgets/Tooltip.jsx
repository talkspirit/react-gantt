import { useState, useEffect, useRef, useCallback } from 'react';
import './Tooltip.css';

function Tooltip(props) {
  const { api, content: Content, filter, children } = props;

  const areaRef = useRef(null);
  const tooltipNodeRef = useRef(null);

  const [areaCoords, setAreaCoords] = useState({});
  const [tooltipData, setTooltipData] = useState(null);
  const [pos, setPos] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  // Hover state: track bar and tooltip independently
  const overBarIdRef = useRef(null);
  const overTooltipRef = useRef(false);
  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const SHOW_DELAY = 300;
  const HIDE_DELAY = 400;

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

  // Boundary clamping — keep tooltip within the area
  useEffect(() => {
    const tooltipNode = tooltipNodeRef.current;
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

  const dismiss = useCallback(() => {
    clearTimeout(showTimerRef.current);
    clearTimeout(hideTimerRef.current);
    showTimerRef.current = null;
    hideTimerRef.current = null;
    overBarIdRef.current = null;
    overTooltipRef.current = false;
    setPos(null);
    setTooltipData(null);
    setIsTouch(false);
  }, []);

  // Core logic: schedule hide only if NEITHER bar NOR tooltip is hovered
  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      // Re-check: user may have moved back to bar or tooltip
      if (!overBarIdRef.current && !overTooltipRef.current) {
        dismiss();
      }
    }, HIDE_DELAY);
  }, [dismiss]);

  const cancelHide = useCallback(() => {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  }, []);

  function move(e) {
    // Ignore events from inside the tooltip
    if (tooltipNodeRef.current && tooltipNodeRef.current.contains(e.target)) {
      return;
    }

    let { id, tooltip, target, at } = findAttribute(e.target);

    // No bar under cursor
    if (!id && !tooltip) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
      overBarIdRef.current = null;
      // Don't hide immediately — user may be crossing to tooltip
      if (!overTooltipRef.current && !hideTimerRef.current) {
        scheduleHide();
      }
      return;
    }

    // Over a bar — cancel any pending hide
    cancelHide();

    if (!tooltip) {
      tooltip = getTaskText(id);
    }

    // Same bar — nothing to do
    if (overBarIdRef.current === id) {
      return;
    }

    // New bar — dismiss old tooltip, show new one after delay
    overBarIdRef.current = id;
    clearTimeout(showTimerRef.current);
    setPos(null);
    setTooltipData(null);
    setIsTouch(false);

    const clientX = e.clientX;

    showTimerRef.current = setTimeout(() => {
      showTimerRef.current = null;
      const taskData = id ? getTaskObj(prepareId(id)) : null;

      // If a filter is provided and rejects this task, skip the tooltip
      if (filter && taskData && !filter(taskData)) {
        overBarIdRef.current = null;
        return;
      }

      if (taskData) {
        setTooltipData(taskData);
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
    }, SHOW_DELAY);
  }

  function onTooltipMouseEnter() {
    overTooltipRef.current = true;
    cancelHide();
  }

  function onTooltipMouseLeave() {
    overTooltipRef.current = false;
    // Only schedule hide if also not on a bar
    if (!overBarIdRef.current) {
      scheduleHide();
    }
  }

  function touchStart(e) {
    const touch = e.touches[0];
    if (!touch) return;
    const { id, target } = findAttribute(e.target);
    if (!id) return;

    clearTimeout(showTimerRef.current);
    clearTimeout(hideTimerRef.current);
    const taskData = getTaskObj(prepareId(id));
    if (filter && taskData && !filter(taskData)) return;
    const tooltip = taskData?.text || '';

    const targetCoords = target.getBoundingClientRect();
    const areaEl = areaRef.current;
    const areaRect = areaEl
      ? areaEl.getBoundingClientRect()
      : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

    setTooltipData(taskData);
    setAreaCoords(areaRect);
    setIsTouch(true);
    setPos({
      top: targetCoords.top - areaRect.top - 8,
      left: touch.clientX - areaRect.left,
      text: tooltip,
    });
  }

  function touchDismiss() {
    dismiss();
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
      clearTimeout(showTimerRef.current);
      clearTimeout(hideTimerRef.current);
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
            <Content data={tooltipData} api={api} />
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
