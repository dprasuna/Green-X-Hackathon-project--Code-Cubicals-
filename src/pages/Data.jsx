import React from 'react'
import { Card } from 'antd'

export default function Data() {
  return (
    <div>
        <section className="bg-muted py-16 px-4 md:px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="banner.png" width={600} height={400} alt="Impact Tracking" className="rounded-lg" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Track Your Impact</h2>
              <p className="text-muted-foreground">
                See the real-time impact of your investments on sustainable agriculture and local communities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-background rounded-lg">
                  <h3 className="font-bold mb-2">Tons of CO2 Offset</h3>
                  <p className="text-4xl font-bold">1,250</p>
                </Card>
                <Card className="p-4 bg-background rounded-lg">
                  <h3 className="font-bold mb-2">Farmers Supported</h3>
                  <p className="text-4xl font-bold">32</p>
                </Card>
                <Card className="p-4 bg-background rounded-lg">
                  <h3 className="font-bold mb-2">Acres of Land Restored</h3>
                  <p className="text-4xl font-bold">750</p>
                </Card>
                <Card className="p-4 bg-background rounded-lg">
                  <h3 className="font-bold mb-2">Local Jobs Created</h3>
                  <p className="text-4xl font-bold">84</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      
    </div>
  )
}
