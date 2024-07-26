import React from "react";

export interface propDivider{
    label?:any;
    lines?:any;
}

const Divider: React.FC<propDivider> = ({
    label, lines
  }: propDivider) => {
    if(lines === 1){
      return(
        <div className="flex items-center justify-start">
            <div
              style={{
                borderBottom: '1px solid #d3d0dc',
                width: '100%',
                opacity: '0.5',
                margin: "1rem 0"
              }}
            ></div>
          </div>
      )
    }
   else{
     return (
        
      <div className={`grid grid-cols-12 py-6`}>
        <div className="col-span-4 md:col-span-5 flex items-center justify-start">
          <div
            style={{
              borderBottom: '1px solid #d3d0dc',
              width: '90%',
              opacity: '0.5',
            }}
          ></div>
        </div>
  
        <div className="col-span-4 md:col-span-2 flex justify-center text-center opacity-50 ">
          {label}
        </div>
  
        <div className="col-span-4 md:col-span-5 flex items-center justify-end">
          <div
            style={{
              borderBottom: '1px solid #d3d0dc',
              width: '90%',
              opacity: '0.5',
            }}
          ></div>
        </div>
      </div>
    )};
  };

  export default Divider;