import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import { Top5Obj } from '../lib/definitions';

interface Props {
  top5: Top5Obj;
}

export default function Top5(props: Props) {
  const top5Table = [];

  // Convert object into an array of [key, value] pairs
  const sortedEntries = Object.entries(props.top5)
    // Sort the array by value in descending order
    .sort((a, b) => b[1] - a[1]);

  // Iterate over sorted entries to generate table rows
  for (let [key, value] of sortedEntries) {
    top5Table.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{(value * 100).toFixed(2)}%</td>
      </tr>
    );
  }

  return (
    <div className={styles.slide}>
      {sortedEntries.length > 0 && (
        <table className={styles.table}>
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
