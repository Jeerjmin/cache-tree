import React from 'react';
import style from './style.css'

export namespace Tools {
    export interface Props {
      deleteNode: Function
      addNode: Function
      enableChangeMode: Function
    }
  }
  
  export const Tools = ({ deleteNode, enableChangeMode }: Tools.Props): JSX.Element => {

    return (
        <div className={style.container}>
            <button> + </button>
            <button onClick={() => deleteNode()}> - </button>
            <button onClick={() => enableChangeMode()}> a </button>
            <button> Apply</button>
            <button> Reset </button>
        </div>
    )
  }
