import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import { Top5Obj } from '../lib/definitions';

interface Props {
  top5: Top5Obj;
}

export default function Top5(props: Props) {
  useEffect(() => {
    console.log(props.top5);
  }, [props.top5]);

  const top5Table = [];

  for (let key in props.top5) {
    top5Table.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{(props.top5[key] * 100).toFixed(2)}%</td>
      </tr>
    );
  }
  return (
    <div className={styles.embla__slide}>
      {Object.keys(props.top5).length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th>Class</th>
              <th>Certainty</th>
            </tr>
          </thead>
          <tbody>{top5Table}</tbody>
        </table>
      )}
    </div>
  );
}
