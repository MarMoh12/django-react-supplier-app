import React from 'react';
import { List, Spin, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SupplierEvaluation } from '../types/models';

interface Props {
  evaluations: SupplierEvaluation[];
  loading: boolean;
  search: string;
  onSearch: (value: string) => void;
  onChangeSearch: (value: string) => void;
  onDelete?: (id: number) => void;
  onEdit?: (evaluation: SupplierEvaluation) => void;
}

const EvaluationList: React.FC<Props> = ({
  evaluations,
  loading,
  search,
  onSearch,
  onChangeSearch,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <h3>Lieferantenbewertungen</h3>

      {/* Suchfeld für Kommentare oder Lieferantennamen */}
      <Input.Search
        placeholder="Nach Kommentar oder Lieferant suchen..."
        allowClear
        enterButton="Suchen"
        size="middle"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        onSearch={onSearch}
        style={{ marginBottom: '1rem', maxWidth: 400 }}
      />

      {loading ? (
        <Spin />
      ) : (
        <List
          bordered
          dataSource={evaluations}
          renderItem={(evaluation) => (
            <List.Item
              actions={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => onEdit?.(evaluation)}
                >
                  Bearbeiten
                </Button>,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  type="link"
                  danger
                  onClick={() => onDelete?.(evaluation.id)}
                >
                  Löschen
                </Button>,
              ]}
            >
              <div>
                <strong>{evaluation.supplier.name}</strong> – Score:{' '}
                <strong>{evaluation.evaluation_score}</strong>
                <br />
                <small>{evaluation.evaluation_date}</small>
                <br />
                <em>{evaluation.comments}</em>
              </div>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default EvaluationList;
