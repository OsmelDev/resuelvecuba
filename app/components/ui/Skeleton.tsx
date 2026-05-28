// interface SkeletonProps {
//   className?: string;
//   variant?: "text" | "circle" | "rectangular";
//   width?: string | number;
//   height?: string | number;
// }

// export function Skeleton({
//   className = "",
//   variant = "text",
//   width,
//   height,
// }: SkeletonProps) {
//   const baseClasses = "animate-pulse bg-gray-200 rounded";

//   const variants = {
//     text: "h-4 rounded",
//     circle: "rounded-full",
//     rectangular: "rounded-lg",
//   };

//   const styles = {
//     width: width || (variant === "text" ? "100%" : "auto"),
//     height: height || (variant === "text" ? "1rem" : "auto"),
//   };

//   return (
//     <div
//       className={`${baseClasses} ${variants[variant]} ${className}`}
//       style={styles}
//     />
//   );
// }

// // Skeleton para tarjeta de servicio
// export function ServicioCardSkeleton() {
//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <div className="flex justify-between items-start mb-3">
//         <Skeleton width="60%" height="20px" />
//         <Skeleton width="40px" height="16px" variant="rectangular" />
//       </div>
//       <Skeleton width="80%" height="14px" className="mb-2" />
//       <Skeleton width="100%" height="14px" className="mb-2" />
//       <Skeleton width="90%" height="14px" className="mb-3" />
//       <div className="flex justify-between items-center pt-3 border-t">
//         <Skeleton width="70px" height="24px" variant="rectangular" />
//         <Skeleton width="80px" height="32px" variant="rectangular" />
//       </div>
//     </div>
//   );
// }

// // Skeleton para lista de proveedores
// export function ProveedorCardSkeleton() {
//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <div className="flex items-start gap-3">
//         <Skeleton width="48px" height="48px" variant="circle" />
//         <div className="flex-1">
//           <Skeleton width="70%" height="18px" className="mb-2" />
//           <Skeleton width="50%" height="14px" className="mb-2" />
//           <Skeleton width="60%" height="14px" />
//         </div>
//       </div>
//     </div>
//   );
// }

// // Skeleton para tabla (admin)
// export function TableSkeleton({ rows = 5, columns = 4 }) {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="p-4 border-b">
//         <Skeleton width="200px" height="24px" />
//       </div>
//       <div className="divide-y">
//         {Array.from({ length: rows }).map((_, i) => (
//           <div key={i} className="p-4 flex gap-4">
//             {Array.from({ length: columns }).map((_, j) => (
//               <Skeleton key={j} className="flex-1" height="20px" />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const variants = {
    text: "h-4 rounded",
    circle: "rounded-full",
    rectangular: "rounded-lg",
  };

  const styles = {
    width: width || (variant === "text" ? "100%" : "auto"),
    height: height || (variant === "text" ? "1rem" : "auto"),
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={styles}
    />
  );
}

export function ProveedorCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <Skeleton width="60%" height="20px" />
        <Skeleton width="40px" height="16px" variant="rectangular" />
      </div>
      <Skeleton width="80%" height="14px" className="mb-2" />
      <Skeleton width="100%" height="14px" className="mb-2" />
      <Skeleton width="90%" height="14px" className="mb-3" />
      <div className="flex justify-between items-center pt-3 border-t">
        <Skeleton width="70px" height="24px" variant="rectangular" />
        <Skeleton width="80px" height="32px" variant="rectangular" />
      </div>
    </div>
  );
}
