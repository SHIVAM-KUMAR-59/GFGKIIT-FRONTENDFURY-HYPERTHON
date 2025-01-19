import React from 'react';
import { DollarSign, PiggyBank, CreditCard, Coins, BarChart4, Landmark, Receipt } from 'lucide-react';


const BackgroundIcons = () => {
    const icons = [
      { Icon: DollarSign, top: "10%", left: "15%", rotation: "15deg", size: 48 },
      { Icon: PiggyBank, top: "25%", left: "35%", rotation: "-20deg", size: 56 },
      { Icon: Landmark, top: "40%", left: "20%", rotation: "-15deg", size: 44 },
      { Icon: Receipt, bottom: "20%", left: "25%", rotation: "20deg", size: 40 },
      
      // Right side
      { Icon: CreditCard, top: "15%", right: "20%", rotation: "-10deg", size: 48 },
      { Icon: Coins, bottom: "30%", right: "15%", rotation: "30deg", size: 52 },
      { Icon: BarChart4, top: "45%", right: "25%", rotation: "15deg", size: 44 },
      
      // Center area (with lower opacity)
      { Icon: DollarSign, top: "50%", left: "45%", rotation: "20deg", size: 36, extraClasses: "opacity-3" },
      { Icon: Coins, bottom: "40%", right: "40%", rotation: "-20deg", size: 40, extraClasses: "opacity-3" },
      
      // Additional scattered instances of the same icons
      { Icon: PiggyBank, bottom: "15%", left: "10%", rotation: "25deg", size: 42 },
      { Icon: Receipt, top: "20%", right: "10%", rotation: "-25deg", size: 38 },
      { Icon: BarChart4, bottom: "10%", right: "45%", rotation: "10deg", size: 46 }
    ];
  
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {icons.map(({ Icon, top, left, right, bottom, rotation }, index) => (
          <div
            key={index}
            className="absolute opacity-30"
            style={{
              top,
              left,
              right,
              bottom,
              transform: `rotate(${rotation})`,
            }}
          >
            <Icon size={48} />
          </div>
        ))}
      </div>
    );
  };

  export default BackgroundIcons;