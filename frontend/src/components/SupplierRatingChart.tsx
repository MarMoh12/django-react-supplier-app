import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { SupplierEvaluation, Supplier } from '../types/models';
import { getEvaluations } from '../services/api';
import { Spin, message } from 'antd';

interface Props {
  suppliers: Supplier[];
}

const SupplierRatingChart: React.FC<Props> = ({ suppliers }) => {
  const [data, setData] = useState<{ name: string; avgScore: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const evaluations = await getEvaluations();

        const averages = suppliers.map((supplier) => {
          const relevant = evaluations.filter(
            (e) => e.supplier.id === supplier.id
          );

          const avg =
            relevant.length > 0
              ? relevant.reduce((sum, e) => sum + e.evaluation_score, 0) / relevant.length
              : 0;

          return {
            name: supplier.name,
            avgScore: parseFloat(avg.toFixed(2)),
          };
        });

        setData(averages);
      } catch (error) {
        message.error('Fehler beim Laden der Bewertungen');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [suppliers]);

  const config = {
    data,
    xField: 'name',
    yField: 'avgScore',
    color: '#1677ff',
    label: {
      position: 'top',
      style: {
        fill: '#595959',
        fontSize: 14,
        fontWeight: 600,
      },
      formatter: (value: number) => `${value} Pkt`,
    },
    xAxis: {
      title: {
        text: 'Lieferant',
        style: { fontSize: 14, fontWeight: 600 },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Ø Bewertung',
        style: { fontSize: 14, fontWeight: 600 },
      },
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Durchschnittliche Bewertungen pro Lieferant</h3>
      {loading ? <Spin /> : <Column {...config} />}
    </div>
  );
};

export default SupplierRatingChart;
