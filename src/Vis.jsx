import React from "react";
import { useEffect, useState, useMemo } from "react";
import "./Vis.css";

export default function Vis({ asset, playerBuffer }) {
  const [d, setD] = useState(null);

  useEffect(() => {
    const filterData = audioBuffer => {
      const rawData = audioBuffer.getChannelData(0);
      const samples = 600;
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];
      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }
      return filteredData;
    };

    const normalizeData = filteredData => {
      const multiplier = Math.pow(Math.max(...filteredData), -1);
      return filteredData.map(n => n * multiplier);
    };

    const draw = normalizedData => {
      const canvas = document.querySelector("#canvas\\\\" + asset.guid);
      const dpr = window.devicePixelRatio || 1;
      const padding = 20;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.translate(0, canvas.offsetHeight / 2 + padding);

      const width = canvas.offsetWidth / normalizedData.length;
      for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let height = normalizedData[i] * canvas.offsetHeight - padding;
        if (height < 0) {
          height = 0;
        } else if (height > canvas.offsetHeight / 2) {
          height = height > canvas.offsetHeight / 2;
        }
        drawLineSegment(ctx, x, height, width, (i + 1) % 2);
      }
    };

    const drawLineSegment = (ctx, x, height, width, isEven) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      height = isEven ? height : -height;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
      ctx.lineTo(x + width, 0);
      ctx.stroke();
    };

    draw(normalizeData(filterData(playerBuffer)));
  }, []);

  function VisCanvas(props) {
    let id = props.name + "\\" + props.guid;

    return (
      <div className="dbos">
        <canvas id={id} />
      </div>
    );
  }

  return useMemo(() => {
    return <VisCanvas name="canvas" guid={asset.guid} />;
  }, [playerBuffer]);
}
