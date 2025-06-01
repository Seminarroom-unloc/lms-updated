import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Play } from 'lucide-react';
import axios from 'axios';

const ReadingMaterials = ({ moduleId }: { moduleId: string }) => {
  const token = localStorage.getItem('token');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    if (!moduleId) return;

    axios
      .get(`http://localhost:8080/api/modules/${moduleId}/reading-materials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error('Error loading materials', err));
  }, [moduleId, token]);

  const filteredMaterials = materials.filter((material) => {
    const catMatch = activeCategory === 'all' || material.category === activeCategory;
    const typeMatch = activeType === 'all' || material.type === activeType;
    return catMatch && typeMatch;
  });

  const handleDownload = async (materialId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/modules/${moduleId}/reading-materials/${materialId}/download`,
        { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `material_${materialId}.pdf`;
      link.click();
    } catch (error) {
      console.error('Download error', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>
            All Categories
          </TabsTrigger>
          <TabsTrigger value="frontend" onClick={() => setActiveCategory('frontend')}>
            Frontend
          </TabsTrigger>
          <TabsTrigger value="backend" onClick={() => setActiveCategory('backend')}>
            Backend
          </TabsTrigger>
          <TabsTrigger value="design" onClick={() => setActiveCategory('design')}>
            Design
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Type Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all" onClick={() => setActiveType('all')}>
            All Types
          </TabsTrigger>
          <TabsTrigger value="pdf" onClick={() => setActiveType('pdf')}>
            PDFs
          </TabsTrigger>
          <TabsTrigger value="video" onClick={() => setActiveType('video')}>
            Videos
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Materials List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="flex flex-col hover:shadow-md transition">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{material.title}</CardTitle>
                <Badge variant="outline" className="text-purple-700 border-purple-700">
                  {material.type === 'video' ? 'Video' : 'PDF'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  if (material.type === 'video') {
                    window.open(material.s3Url, '_blank');
                  } else {
                    handleDownload(material.id);
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {material.type === 'video' ? 'Watch Video' : 'Download PDF'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReadingMaterials;
