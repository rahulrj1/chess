import React, { useRef } from "react"
import { useState } from "react"
import "./chessboard.css"
import Tile from "../tile/tile"




let horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
let verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

const initialBoard = [];

initialBoard.push({ image:"images/br.png", x:0, y:0 });
initialBoard.push({ image:"images/br.png", x:0, y:7 });
initialBoard.push({ image:"images/bn.png", x:0, y:1 });
initialBoard.push({ image:"images/bn.png", x:0, y:6 });
initialBoard.push({ image:"images/bb.png", x:0, y:2 });
initialBoard.push({ image:"images/bb.png", x:0, y:5 });
initialBoard.push({ image:"images/bq.png", x:0, y:3 });
initialBoard.push({ image:"images/bk.png", x:0, y:4 });

initialBoard.push({ image:"images/wr.png", x:7, y:0 });
initialBoard.push({ image:"images/wr.png", x:7, y:7 });
initialBoard.push({ image:"images/wn.png", x:7, y:1 });
initialBoard.push({ image:"images/wn.png", x:7, y:6 });
initialBoard.push({ image:"images/wb.png", x:7, y:2 });
initialBoard.push({ image:"images/wb.png", x:7, y:5 });
initialBoard.push({ image:"images/wq.png", x:7, y:3 });
initialBoard.push({ image:"images/wk.png", x:7, y:4 });

for (let i = 0; i < 8; i++) { initialBoard.push({ image:"images/bp.png", x:1, y:i }) };
for (let i = 0; i < 8; i++) { initialBoard.push({ image:"images/wp.png", x:6, y:i }) };


function Chessboard() {
    const chessBoardRef = useRef(null);
    const [pieces, setPieces] = useState(initialBoard);
    const [initialX, setInitialX] = useState(null);
    const [initialY, setInitialY] = useState(null);
    const [activePiece, setActivePiece] = useState(null);
    // console.log(pieces);

    let board = [];
    for (let row = 0; row <= 7; row++) {
        for (let col = 0; col <= 7; col++) {
            board.push(<span>
                {/* {horizontalAxis[row]} {verticalAxis[7-col]}  */}
                <Tile 
                    pieces={pieces} 
                    row={row} 
                    col={col} 
                    key={`horizontalAxis[row],verticalAxis[7 - row]`} /></span>)
        }
    }

    function grabPiece(e) {
        const chessboard = chessBoardRef.current;
        const element = e.target
        if (element.classList.contains("chess-piece")) {
            setInitialY(Math.floor((e.clientX - chessboard.offsetLeft)/70));
            setInitialX(Math.floor((e.clientY - chessboard.offsetTop)/70));
            // console.log(e);

            const x = e.clientX - 35;
            const y = e.clientY - 35;
            element.style.position = "absolute";
            element.style.left = `${x}px`
            element.style.top = `${y}px`

            setActivePiece(element);
        }
        //console.log(e.target)
    }

    function movePiece(e) {

        const chessboard = chessBoardRef.current;

        if (activePiece && chessboard) {

            //console.log(e);
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 60;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 60;
            const x = e.clientX - 35;
            const y = e.clientY - 35;
            activePiece.style.position = "absolute";

            if (x < minX) {
                activePiece.style.left = `${minX}px`
            }
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`
            }
            else {
                activePiece.style.left = `${x}px`
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`
            }
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`
            }
            else {
                activePiece.style.top = `${y}px`
            }

        }
        //console.log(e.target)
    }

    function dropPiece(e) {
        const chessboard = chessBoardRef.current;
        const col_num = Math.floor((e.clientX - chessboard.offsetLeft)/70);
        const row_num = Math.floor((e.clientY - chessboard.offsetTop)/70);
        const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 60;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 60;
        // console.log(initialX, initialY);
        // console.log(row_num, col_num);
        if (activePiece) {
            if(e.clientX > maxX || e.clientX < minX || e.clientY > maxY || e.clientY < minY) {
                setPieces(pieces);
            } else{
                setPieces( prevPieces =>{
                    const newPieces = prevPieces.map( piece=>{
                        if(piece.x === initialX && piece.y === initialY) {
                            piece.x = row_num;
                            piece.y = col_num;
                        }
                        return piece;
                    } );
                    return newPieces;
                })
            }
            setActivePiece(null);
            setInitialX(null);
            setInitialY(null);
        }

    }

    return (
        <div
            className="chessboard"
            ref={chessBoardRef}
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={e => dropPiece(e)}
        >
            {board}
            {/* {console.log(pieces)} */}
        </div>
    )
}

export default Chessboard