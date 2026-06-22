"use client";

import { useMemo, useState } from "react";

type Bay = {
  id: number;
  name: string;
  capacity: number;
  pipeA: {
    name: string;
    qty: number;
  };
  pipeB: {
    name: string;
    qty: number;
  };
};

export default function CargoPage() {
  const [bays, setBays] = useState<Bay[]>([
    {
      id: 4,
      name: "BAY 4",
      capacity: 50,
      pipeA: {
        name: 'PLAIN',
        qty: 50,
      },
      pipeB: {
        name: 'ANODES',
        qty: 0,
      },
    },
    {
      id: 3,
      name: "BAY 3",
      capacity: 50,
      pipeA: {
        name: 'PLAIN',
        qty: 48,
      },
      pipeB: {
        name: 'ANODES',
        qty: 2,
      },
    },
    {
      id: 2,
      name: "BAY 2",
      capacity: 50,
      pipeA: {
        name: "PLAIN",
        qty: 33,
      },
      pipeB: {
        name: "ANODES",
        qty: 17,
      },
    },
    {
      id: 1,
      name: "BAY 1",
      capacity: 50,
      pipeA: {
        name: "PLAIN",
        qty: 50,
      },
      pipeB: {
        name: "ANODES",
        qty: 0,
      },
    },
  ]);

  const updatePipe = (
    bayId: number,
    pipe: "pipeA" | "pipeB",
    change: number
  ) => {
    setBays((prev) =>
      prev.map((bay) => {
        if (bay.id !== bayId) return bay;

        const total = bay.pipeA.qty + bay.pipeB.qty;

        if (change > 0 && total >= bay.capacity) {
          return bay;
        }

        const current = bay[pipe].qty;

        if (change < 0 && current === 0) {
          return bay;
        }

        return {
          ...bay,
          [pipe]: {
            ...bay[pipe],
            qty: Math.max(0, current + change),
          },
        };
      })
    );
  };

  const totalShip = useMemo(() => {
    return bays.reduce(
      (sum, bay) => sum + bay.pipeA.qty + bay.pipeB.qty,
      0
    );
  }, [bays]);

  const totalCapacity = useMemo(() => {
    return bays.reduce((sum, bay) => sum + bay.capacity, 0);
  }, [bays]);

  const shipPercent = Math.round(
    (totalShip / totalCapacity) * 100
  );

  return (
    
  <main className="min-h-screen bg-zinc-950 text-white pb-24"> 



  <div className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950 px-4 py-4">
  <nav className="fixed sticky top-0 left-0 right-0 border-b border-zinc-800 bg-zinc-950">
        <div className="flex justify-around py-3">
          
        <button>👤 User</button>
          <button className="font-bold text-blue-400">
            ⚓ Cargo
          </button>

          <button>📊 Stats</button>
        </div>
      </nav>
  <h1 className="text-center text-2xl font-bold">
    Brage Pipe Tracker
  </h1>

  <p className="mt-1 text-center text-zinc-400">
    SAR BRAGE
  </p>

  <div className="mt-4 rounded-xl bg-zinc-900 p-4">
    <div className="mb-3 flex items-center justify-between">
      <button className="rounded-lg bg-green-600 px-4 py-2 font-semibold">
        START
      </button>

      <div className="text-center">
        <p className="text-xs uppercase text-zinc-400">
          Voyage
        </p>

        <p className="font-bold">
          BRG-2508
        </p>
      </div>

      <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold">
        FINISH
      </button>
    </div>

    <div className="text-center">
      <p className="text-sm text-zinc-400">
        TOTAL SHIP
      </p>

      <p className="text-4xl font-bold">
        {totalShip} / {totalCapacity}
      </p>

      <p className="mt-1 text-lg">
        {shipPercent}%
      </p>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-zinc-700">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${shipPercent}%`,
          }}
        />
      </div>
    </div>
  </div>
</div>

 
 


      <div className="p-4">
        {bays.map((bay) => {
          const total =
            bay.pipeA.qty + bay.pipeB.qty;

          const percent = Math.round(
            (total / bay.capacity) * 100
          );

          return (
            <div
              key={bay.id}
              className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {bay.name}
                </h2>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                  {percent}%
                </span>
              </div>

              <div className="mb-4 rounded-xl bg-zinc-950 p-3">
                <p className="text-sm text-zinc-400">
                  {bay.pipeA.name}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() =>
                      updatePipe(
                        bay.id,
                        "pipeA",
                        -1
                      )
                    }
                    className="h-14 w-14 rounded-xl bg-red-600 text-2xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-4xl font-bold">
                    {bay.pipeA.qty}
                  </span>

                  <button
                    disabled={
                      total >= bay.capacity
                    }
                    onClick={() =>
                      updatePipe(
                        bay.id,
                        "pipeA",
                        1
                      )
                    }
                    className="h-14 w-14 rounded-xl bg-green-600 text-2xl font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-zinc-950 p-3">
                <p className="text-sm text-zinc-400">
                  {bay.pipeB.name}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() =>
                      updatePipe(
                        bay.id,
                        "pipeB",
                        -1
                      )
                    }
                    className="h-14 w-14 rounded-xl bg-red-600 text-2xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-4xl font-bold">
                    {bay.pipeB.qty}
                  </span>

                  <button
                    disabled={
                      total >= bay.capacity
                    }
                    onClick={() =>
                      updatePipe(
                        bay.id,
                        "pipeB",
                        1
                      )
                    }
                    className="h-14 w-14 rounded-xl bg-green-600 text-2xl font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">
                    TOTAL
                  </span>

                  <span className="font-bold">
                    {total} / {bay.capacity}
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className={`h-full rounded-full ${
                      percent >= 95
                        ? "bg-red-500"
                        : percent >= 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                {total >= bay.capacity && (
                  <p className="mt-2 text-center font-semibold text-red-400">
                    BAY FULL
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      
    </main>
  );
}
