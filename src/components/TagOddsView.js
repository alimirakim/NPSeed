import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts'

export default function TagOddsView({ traitType }) {
  const tagTypes = useSelector(state => state.tagTypes)
  const tagTypeChances = useSelector(state => state.tagTypeChances)
  const tags = useSelector(state => state.tags)
  console.log("traitType", traitType)

  return (
    <section>
      <h4>Probability Breakdown: "{traitType.traitType}"</h4>
      {traitType.tagTypeIds.map(ttid => {
        return (<>
          <h5 key={`tag-type ${ttid}`}>
            {tagTypes[ttid].tagType} Probabilities
          </h5>

          <TagTypeChancesPieChart tagTypeChance={tagTypeChances[ttid]} />
        </>)
      })}
    </section>
  )
}


// Format probability data for one tag type, for use with rechart



function TagTypeChancesPieChart({ tagTypeChance }) {
  const tags = useSelector(state => state.tags)
  const [activeIndex, setActiveIndex] = useState(0)
  const data = []
  let h = 200
  tagTypeChance.tagChances.forEach(tc => {
    data.push({
      name: tags[tc.tag_id].tag,
      value: tc.chance * 100,
      color: `hsl(${h},60% , 60%)`,
    })
    h += 50
  })


  const handleMouseEnter = (data, i) => setActiveIndex(i)


  return (<>
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%" cy="50%"
        label={pieCustomLabel}
        outerRadius={80}
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={pieLabelHoverEffect}
        onMouseEnter={handleMouseEnter}
      >
        {data.map((entry, i) => (
          <Cell key={`cell-${i}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </>
  )
}



function pieCustomLabel(props) {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, fill, percent, name, color
  } = props;
  
  // For outer-slice name label
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius) * cos;
  const sy = cy + (outerRadius) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // For inner-slice percentage label
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
    
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={color}>{name}</text>

      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      
    </g>
  )
}



function pieLabelHoverEffect(props) {
  console.log("active props", props)
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;

  return (
    <g>
    {/* Renders inner pie slice */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Renders outer pie ring-slice */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}