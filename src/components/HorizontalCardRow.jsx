export default function HorizontalCardRow({ item, type }) {
  return (
    <div className="mb-4">
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
        {store.people.map((item) => (
          <ItemCard key={item.url} item={item} type="people" />
        ))}
      </div>
    </div>
  );
}
